import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, } from '@expo/vector-icons';


const CameraButton = ({ onTouch, iconName, iconSize = 24, iconColor = 'black' }) => {
    return (
        <TouchableOpacity onPress={onTouch}>
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    )
}

export default CameraButton