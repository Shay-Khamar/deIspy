import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CameraButton = ({onTouch, text = 'SNAP!', color = '#000', textColor = '#fff'}) => {
  return (
   <TouchableOpacity onPress={onTouch} style={[styles.button, {backgroundColor: color}]}>
    <Text style={[styles.text, {color: textColor}]}>{text}</Text>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    minHeight: 40,
  },
  text: {
    fontSize: 18,
  },
});

export default CameraButton