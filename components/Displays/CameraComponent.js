import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButton from '../Buttons/CameraButton';
import IconButton from '../Buttons/IconButton';
import { Ionicons } from '@expo/vector-icons';

const CameraComponent = ({ onPictureTaken }) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
    



    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const handleCameraRef = (ref) => {
        setCamera(ref);
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
            const { base64 } = await camera.takePictureAsync({ base64: true });

            setCapturedImage(`data:image/jpeg;base64,${base64}`);

            onPictureTaken(base64); // Pass the captured image to the parent component
        } catch (error) {
            console.error('Error taking picture or analyzing:', error.message);
        }
    };


    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const cameraWidth = screenWidth - 20 - (screenWidth % 2); // Adjust the width by subtracting 40 (20px padding on each side) and making it even
    const cameraHeight = (cameraWidth - 20) * (3 / 4); // Assuming 4:3 aspect ratio

    

    // Return the camera and toggle button
    return (
        <View style={styles.container}>
            {capturedImage ? ( // Display the captured image
                <View style={styles.cameraContainer}>
                    <Image style={[styles.camera, { width: cameraWidth, height: cameraHeight }]}
                    source={{ uri: capturedImage }} 
                    />
                </View>
            ) : (
                cameraPermission && (
                    <>
                        <View style={[styles.cameraContainer, { width: cameraWidth, height: cameraHeight, marginTop: 20 }]}>
                            <Camera
                                style={[styles.camera, { width: cameraWidth, height: cameraHeight }]}
                                type={cameraType}
                                ref={handleCameraRef}
                            >
                            </Camera>
                        </View>
                        <IconButton onTouch={toggleCameraType} iconName="ios-camera-reverse" color="#FF6347" />
                        <View style={styles.takePictureButton}>
                        <CameraButton 
                        onTouch={takePictureAsync} 
                        color="#FF6347" 
                        textColor="white" 
                        iconName="ios-camera" 
                        iconSize={60}
                        size={93} 
                        />
                        </View>
                    </>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        //overflow: 'hidden', // Prevent children from overflowing
        borderRadius: 20,
    },
    camera: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    takePictureButton: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});
export default CameraComponent;