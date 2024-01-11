/**
 * Hint text component
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import colours from '../../colours';

/**
 * Functional component to display hint text
 * @param {object} selectedItem - Selected item 
 */
const HintText = ({ selectedItem }) => {

    /**
     * Hint text state
     */
    const [hintText, setHintText] = useState('');

    /**
     * Generate hint text on selected item change
     */
    useEffect(() => {
        if (selectedItem !== null) {
            const hint = selectedItem.charAt(0).toUpperCase();
            setHintText(prev => `Something beginning with '${hint}'` || '');
        } else {
            setHintText(prev => '');
        }
    }, [selectedItem]);

    if (!selectedItem) {
        return null; // return null if no item is selected
    }

    if (!hintText) {
        return null;
    }


    return (
        <Text style={styles.label}>{hintText}</Text>
    );


};

/**
 * Component styles
 */
const styles = StyleSheet.create({
    label: {
        fontFamily: 'sans-serif',
      fontSize: 26,
      marginBottom: 10,
      fontWeight: 'bold',
        color: colours.textColour,
    },
});

export default HintText;