// GalleryOpener.js
import React from 'react';
import { Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';

const GalleryOpener = ({ onImageSelected }) => {
    const openGallery = async () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Convert the image URI to a base64 string
                const base64 = await FileSystem.readAsStringAsync(response.uri, { encoding: 'base64' });
                onImageSelected(`data:image/jpeg;base64,${base64}`);
            }
        });
    };

    return (
        <Button title="Open Gallery" onPress={openGallery} />
    );
};

export default GalleryOpener;