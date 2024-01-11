

/**
 * Represents a component that displays instructions with an icon.
 * @module Instructions
 * @param {string} text - The text to be displayed as the instruction.
 * @param {string} iconName - The name of the icon to be displayed.
 * @param {string} [color='black'] - The color of the icon.
 * @returns {JSX.Element} The rendered Instructions component.
 */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../colours';

const Instructions = ({text,iconName, color ='black'}) => {
  return (
    <View style={styles.instructionContainer}>
    <Text style={styles.instructionText}>{text}</Text>
    <Icon name={iconName} size={30} color={color} />
    </View>
  )
}

export default Instructions

const styles = StyleSheet.create({
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%',
        paddingHorizontal: '10%',
        // Add more styling as needed
      },
      instructionText: {
        flex: 1,
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: colours.textColour,
        // Add more styling as needed
      },

})