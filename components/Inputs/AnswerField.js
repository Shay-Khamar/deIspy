import React from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput  } from 'react-native'
import colours from '../../colours';

const AnswerField = ({ placeholder, onChangeText, value,}) => {
  return (
    <View stlye={styles.searchBar}>
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.input}
    />
    </View>
  );
};

const styles = StyleSheet.create({

  searchBar: {
    position: 'relative',
    height: '10%', // Fixed height for the AnswerField
    width: '75%',
    margin: 12,
    // backgroundColor: 'grey'
  },

  input: {
    borderWidth: 3,
    padding: '4%',
    borderColor: colours.primaryColour,
    borderRadius: 20,
    backgroundColor: colours.secondaryColour,
    paddingRight: 40, // Ensure space for the icon on the right
    fontWeight: 'bold',
    fontSize: 15,
    color: colours.textColour,
  }
   
});

export default AnswerField;