import React, {useRef} from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput,  TouchableWithoutFeedback, Dimensions  } from 'react-native'
import colours from '../../colours';

const AnswerField = ({ placeholder, onChangeText, value, selectedItem, isEnabled, opacity }) => {
  const underscoreArray = selectedItem ? selectedItem.split('').map(char => char === ' ' ? ' ' : '_'): [];
  const inputRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const answerFieldWidth = screenWidth * 0.8;

  const onChangeTextDirect = (text) => {
    // Limit the input to the length of selectedItem (without spaces)
    const modifiedText = text.substring(0, selectedItem.replace(/\s/g, '').length);
    onChangeText(modifiedText);
  };



  const displayValue = () => {
    let displayIndex = 0;
    let displayText = '';

    for (let i = 0; i < selectedItem.length; i++) {
      if (selectedItem[i] === ' ') {
        displayText += ' ';
      } else if (displayIndex < value.length) {
        displayText += value[displayIndex];
        displayIndex++;
      } else {
        displayText += '_';
      }
    }

    return displayText;
  };




  const handleFieldPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  return (
    <TouchableWithoutFeedback onPress={handleFieldPress} disabled={!isEnabled}>
    <View style={[styles.searchBar, { width: answerFieldWidth, opacity: opacity }]}>
      {selectedItem && (
        <View style={styles.underscoreContainer}>
          {displayValue().split('').map((char, index) => (
            <Text key={index} style={styles.underscoreText}>{char}</Text>
          ))}
        </View>
      )}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={onChangeTextDirect}
        value={value}
        style={styles.input}
      />
    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    overflow: 'hidden', 
  },
  underscoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1, 
  },
  underscoreText: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  input: {
    position: 'absolute', 
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 15,
    opacity: 0, 
  },
});

export default AnswerField;