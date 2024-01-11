import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButton from '../Buttons/CameraButton';
import IconButton from '../Buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../colours';

const CameraComponent = ({ onPictureTaken }) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraMode, setIsCameraMode] = useState(true);
    const [supportedRatios, setSupportedRatios] = useState([]);
    const [selectedRatio, setSelectedRatio] = useState('16:9'); // Default to 16:9, will update based on device

    



    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);


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


    


    const toggleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

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
            const { base64 } = await camera.takePictureAsync({ base64: true, quality: 1,  });

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
                 //style={{ flex: 1 }} // Full screen
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

    )
};

const styles = StyleSheet.create({
    cameraContainer: {
        //overflow: 'hidden', // Prevent children from overflowing
        flex: 1,
        justifyContent: 'flex-end',
    },
    camera: {
       flex: 1,
    },

    takePictureButton: {
        position: 'absolute', // Position over the camera view
        bottom: 20, // Spacing from the bottom
        alignSelf: 'center', // Center horizontally
        
    },

    toggleCameraButton: {
        position: 'absolute', // Position over the camera view
        top: 20, // Spacing from the top, adjust as needed
        alignSelf: 'center', // Center horizontally
        opacity: 0.7,
    },
});
export default CameraComponent;

