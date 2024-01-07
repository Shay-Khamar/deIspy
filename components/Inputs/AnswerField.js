import React, {useRef} from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput,  TouchableWithoutFeedback, Dimensions  } from 'react-native'
import colours from '../../colours';

const AnswerField = ({ placeholder, onChangeText, value, selectedItem }) => {
  const underscoreArray = selectedItem  ? selectedItem.split('').map(char => char === ' ' ? ' ' : '_')
  : [];
  const maxFieldWidth = 200; // Set the maximum width for the search bar
  const inputRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const answerFieldWidth = screenWidth * 0.8;




  const handleFieldPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleFieldPress}>
    <View style={[styles.searchBar, { width: answerFieldWidth }]}>
      {selectedItem && ( // Only render if selectedItem exists
        <View style={styles.underscoreContainer}>
          {underscoreArray.map((_, index) => (
            <Text key={index} style={styles.underscoreText}>
              {value.length > index ? value.charAt(index) : '_'}
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
    overflow: 'hidden', // Hide content that exceeds the container
  },
  underscoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1, // Allow the container to shrink to its contents
  },
  underscoreText: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  input: {
    position: 'absolute', // Position the TextInput absolutely
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 15,
    opacity: 0, // Keep it invisible
  },
});

export default AnswerField;