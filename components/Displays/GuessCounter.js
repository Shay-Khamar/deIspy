/**
 * Guess counter component
 */

import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import colours from '../../colours';

/** 
 * Get device dimensions
*/
const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height;

/**
 * Calculate square size based on smaller dimension
 */
const squareSize = Math.min(windowWidth, windowHeight) * 0.25; 

/**
 * Guess counter functional component
 * @param {number} chancesLeft - Chances remaining
 */
const GuessCounter = ({ chancesLeft }) => {

    return (
        <>
        <Text style={styles.label}>Chances:</Text>
        <View style={[styles.container, { width: squareSize, height: squareSize }]}>
            
            <Text style={styles.text}>{chancesLeft}</Text>
        </View>
        </>
    );
};

/**
 * Component styles
 */
const styles = {
    container: {
        backgroundColor: colours.secondaryColour,
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
    },

    label: {
        fontSize: 23,
        fontWeight: 'bold',
    },
};

export default GuessCounter;
