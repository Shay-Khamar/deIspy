
/**
 * Renders the "How To Play" screen.
 * @returns {JSX.Element} The rendered "How To Play" screen.
 */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colours from '../../colours'

import Instructions from '../TextElements/Instructions'

const HowToPlay = () => {
  return (
    <>
    <View style={styles.header}>
      <Text style={styles.headerText}>How To Play</Text>
    </View>
    <View style={styles.instructionContainer}>
    <Instructions text="Tap! play and tap! the CameraButton to take a picture." iconName="camera" />
    <Instructions text="You should be given a clue about the item." iconName="question-circle" />
    <Instructions text="Type  your answer into the answer box and tap the tick to confirm." iconName="check-square" />
    <Instructions text="You only have three chances to get it right." iconName="heart" />
    <Instructions text="HINT - The underscores tell you how long the item in mind is. " iconName="minus" />
    <Instructions text="You Can even use a picture from your phone by opening gallery. " iconName="image" />
    </View>
    </>
  )
}

export default HowToPlay

const styles = StyleSheet.create({
    header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: colours.textColour,
        fontFamily: 'sans-serif',
    },

    instructionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10%',
        marginBottom: '10%',
        paddingHorizontal: '10%',
      },

})