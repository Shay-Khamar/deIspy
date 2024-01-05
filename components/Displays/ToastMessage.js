/**
 * Animated toast message component 
 */

import { StyleSheet, Text, View, Animated } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

/**
 * Toast Message Component
 * @param {Animated.Value} opacityValue - Animated opacity value 
 * @param {string} message - Message to display
 * @param {function} onHide - Callback when message hides
 * @param {boolean} visible - Whether message is visible
 */
const ToastMessage = (props) => {

    const { opacityValue, message, onHide, visible } = props;

    /**
     * Animated translate Y transform 
     */
    const translateY = opacityValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 0],
    });
  
    useEffect(() => {
      if (visible) {
        Animated.sequence([
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true, 
          }),
          Animated.delay(2000),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide(); 
        });
      }
    }, [visible]);
  
    return (
      visible && (
        <Animated.View style={[styles.container, { opacity: opacityValue, transform: [{ translateY }] }]}>
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      )
    );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({

    container: {
        margin: 18,
        marginBottom: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffest: {  
            width: 0,  
            height: 2 
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation : 6,
    },

    text:{
        fontSize: 16,
        fontWeight: 'bold',
    }

});

export default ToastMessage;