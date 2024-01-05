/**
 * Modal component with animation
 */

import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import CameraButton from '../Buttons/CameraButton';

/**
 * Modal component
 * @param {boolean} visible - Whether modal is visible
 * @param {function} goBackButton - Go back button function
 * @param {function} tryAgainButton - Try again button function  
 * @param {string} message - Message to display 
 * @param {string} header - Modal header text
 */
const Modal = forwardRef(({ visible, goBackButton, tryAgainButton, message, header = 'PLACEHOLDER' }, ref) => {

  /**
   * Animated value for scale animation
   */
  const [animation, setAnimation] = useState(new Animated.Value(0));

  /** 
   * Get device height
   */
  const { height } = Dimensions.get('window');

  /**
   * Open animation
   */
  const openAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  /**
   * Close animation
   */
  const closeAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  
  /**
   * Expose animation controls
   */
  useImperativeHandle(ref, () => ({
    openAnimation,
    closeAnimation 
  }));

  /**
   * Scale animation
   */
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  /**
   * Animated styles
   */
  const animatedStyles = {
    transform: [{ scale }],
  };

  

  return (
     visible ? (
      <Animated.View style={[animatedStyles]}>
        <View style={[styles.wrap]} >
          <Text style={[styles.headerText]}>{header}</Text>
          <Text style={[styles.description]}>
            {message} Something I typed up to fill the space this was more difficult than I thought, ran out of ideas straight away damn!
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 64 }}>
            <CameraButton onTouch={tryAgainButton} color="#FFA500" textColor="white" text="TRY AGAIN" size={40} iconName="reload-sharp" iconSize={20} />
            <CameraButton onTouch={goBackButton} color="#FFA500" textColor="white" text="GO BACK" size={40} iconName="arrow-back-sharp" iconSize={20} />
          </View>
        </View>
      </Animated.View>
    ) :null
  );
});

export default Modal;

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  wrap: {
    padding: 20,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#2D3953',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: 16,
    color: '#fff',
  },
});
