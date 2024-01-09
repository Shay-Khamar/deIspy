import React, {useRef} from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput,  TouchableWithoutFeedback, Dimensions  } from 'react-native'
import colours from '../../colours';

const AnswerField = ({ placeholder, onChangeText, value, selectedItem, isEnabled, opacity }) => {
  const underscoreArray = selectedItem ? selectedItem.split('').map(char => char === ' ' ? ' ' : '_'): [];
  const inputRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const answerFieldWidth = screenWidth * 0.8;




  const handleFieldPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeTextModified = (text) => {
    let newText = '';
    let inputIndex = 0;
  
    for (let i = 0; i < selectedItem.length; i++) {
      if (selectedItem[i] === ' ') {
        newText += ' ';
      } else if (inputIndex < text.length && text[inputIndex] !== ' ') {
        newText += text[inputIndex];
        inputIndex++;
      } else {
        newText += '_';
      }
    }
  
    onChangeText(newText);
  };

  return (
    <TouchableWithoutFeedback onPress={handleFieldPress} disabled={!isEnabled}>
    <View style={[styles.searchBar, { width: answerFieldWidth, opacity: opacity }]}>
      {selectedItem && (
        <View style={styles.underscoreContainer}>
          {underscoreArray.map((char, index) => (
            <Text key={index} style={styles.underscoreText}>
              {char === ' ' ? ' ' : (value.length > index ? value.charAt(index) : '_')}
            </Text>
          ))}
        </View>
      )}
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={onChangeText}
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