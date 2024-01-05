/**
 * Guess counter component
 */

import React from 'react';
import { View, Text, Dimensions } from 'react-native';

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
        <View style={[styles.container, { width: squareSize, height: squareSize }]}>
            <Text style={styles.text}>{chancesLeft}</Text>
        </View>
    );
};

/**
 * Component styles
 */
const styles = {
    container: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
    },
};

export default GuessCounter;
