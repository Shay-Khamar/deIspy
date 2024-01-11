import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, } from '@expo/vector-icons';
import colours from '../../colours';



/**
 * Renders a camera button component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onTouch - The function to be called when the button is touched.
 * @param {string} props.iconName - The name of the icon to be displayed.
 * @param {number} [props.iconSize=24] - The size of the icon.
 * @param {string} props.iconColor - The color of the icon.
 * @returns {JSX.Element} The rendered camera button component.
 */
const CameraButton = ({ onTouch, iconName, iconSize = 24, iconColor }) => {
    return (
        <TouchableOpacity onPress={onTouch}>
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    )
}

export default CameraButton