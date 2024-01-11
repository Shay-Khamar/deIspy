import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { ThemedButton } from "react-native-really-awesome-button";
import VisionTester from './VisionTester';
import colours from '../../colours';

const GalleryScreen = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === 'granted');
    })();
  }, []);



  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(status === 'granted');

    if (status !== 'granted') {
      console.log('Permission to access gallery was denied');
      navigation.navigate('HomeScreen');
    }
  };


  const openGallery = async () => {
    if (hasGalleryPermission !== true) {
      console.log('Permission to access gallery was denied');
      await requestGalleryPermission(); // Request permission if not granted
      return;
    }
  
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    };
  
    let result = await ImagePicker.launchImageLibraryAsync(options);
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uri = asset.uri;
  
      try {
        const resizedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800, height: 600 } }],
          { format: 'jpeg', base64: true }
        );
  
        if (resizedImage.base64) {
          navigation.navigate('VisionTester', {
            imageBase64: `data:image/jpeg;base64,${resizedImage.base64}`,
          });
        } else {
          console.log('Failed to resize the image.');
        }
      } catch (error) {
        console.error('Error manipulating the image:', error);
      }
    } else {
      console.log('No image selected or no items found in the response.');
    }
  };


 


 

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery Screen (In developement!)</Text>
      <View style={styles.buttonContainer}>
        <ThemedButton
          name="bruce"
          type="secondary"
          style={styles.button}
          width={100}
          onPressOut={openGallery}
        >
          Open Gallery
        </ThemedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : colours.backgroundColour,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 10,
  },
});

export default GalleryScreen;
