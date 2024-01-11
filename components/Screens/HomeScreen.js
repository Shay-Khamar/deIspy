import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';



const HomeScreen = () => {

        const navigation = useNavigation();

        const playButton = () => {
            navigation.navigate('VisionTester');
        }

        const htpButton = () => {
            navigation.navigate('HowToPlay');
        }


        const openGallery = async () => {
            const options = {
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
    
            launchImageLibrary(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    // Convert the image URI to a base64 string
                    const base64 = await FileSystem.readAsStringAsync(response.uri, { encoding: 'base64' });
                    navigation.navigate('VisionTester', { imageBase64: `data:image/jpeg;base64,${base64}` });
                }
            });
        };










    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            <View style={styles.buttonContainer}>
            <ThemedButton name="bruce" type="secondary" style={styles.button} width={100} onPressOut={htpButton}>How To Play</ThemedButton>
            <ThemedButton name="bruce" type="primary" style={styles.button} width={100} onPressOut={playButton}>Play</ThemedButton>
            <ThemedButton name="bruce" type="secondary" style={styles.button} width={100} onPressOut={openGallery}>Open Gallery </ThemedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default HomeScreen;
