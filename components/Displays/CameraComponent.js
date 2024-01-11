
/**
 * A React component that represents a camera component.
 * @module CameraComponent
 * @param {function} onPictureTaken - A callback function to handle the captured image.
 * @returns {JSX.Element} The camera component.
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButton from '../Buttons/CameraButton';
import IconButton from '../Buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../colours';

/**
 * Represents a camera component.
 * @param {Object} props - The component props.
 * @param {function} props.onPictureTaken - A callback function to handle the captured image.
 * @returns {JSX.Element} The camera component.
 */
const CameraComponent = ({ onPictureTaken }) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraMode, setIsCameraMode] = useState(true);
    const [supportedRatios, setSupportedRatios] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState('16:9'); // Default to 16:9, will update based on device

    /**
     * Requests camera permissions and sets the camera permission state.
     */
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);

    /**
     * Sets the camera reference and retrieves the supported camera ratios.
     * @param {Object} ref - The camera reference.
     */
    const handleCameraRef = async (ref) => {
        setCamera(ref);
        if (ref) {
            const ratios = await ref.getSupportedRatiosAsync();
            setSupportedRatios(ratios);

            const screenRatio = screenWidth / screenHeight;
            let closestRatio = ratios[0];
            let minDiff = Number.MAX_VALUE;

            ratios.forEach(ratio => {
                const parts = ratio.split(':').map(Number);
                const cameraRatio = parts[0] / parts[1];
                const diff = Math.abs(screenRatio - cameraRatio);

                if (diff < minDiff) {
                    minDiff = diff;
                    closestRatio = ratio;
                }
            });

            setSelectedRatio(closestRatio); // Assuming you have a state to store this
        }
    };

    /**
     * Toggles the camera type between front and back.
     */
    const toggleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    /**
     * Takes a picture using the camera and calls the onPictureTaken callback with the captured image.
     */
    const takePictureAsync = async () => {
        if (!cameraPermission) {
            alert('Camera permission not granted');
            return;
        }

        if (!camera) {
            alert('Camera not available');
            return;
        }

        try {
            const { base64 } = await camera.takePictureAsync({ base64: true, quality: 1 });

            setCapturedImage(`data:image/jpeg;base64,${base64}`);

            onPictureTaken(base64); // Pass the captured image to the parent component
        } catch (error) {
            console.error('Error taking picture or analyzing:', error.message);
        }
        setIsCameraMode(false);
    };

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Return the camera and toggle button
    return (
        <View style={styles.cameraContainer}>
            {isCameraMode && cameraPermission && (
                <>
                    <Camera
                        style={{ width: screenWidth, height: screenHeight }}
                        type={cameraType}
                        ratio={selectedRatio}
                        ref={handleCameraRef}
                    />
                    <View style={styles.toggleCameraButton}>
                        <IconButton onTouch={toggleCameraType} iconName="ios-camera-reverse" iconColor={colours.accentColour} iconSize={30} />
                    </View>
                    <View style={styles.takePictureButton}>
                        <CameraButton onTouch={takePictureAsync} color={colours.primaryColour} textColor="white" iconName="ios-camera" iconSize={60} size={93} text={'PRESS ME !'} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    camera: {
        flex: 1,
    },
    takePictureButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    toggleCameraButton: {
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
        opacity: 0.7,
    },
});

export default CameraComponent;

