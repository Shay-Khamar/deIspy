import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';




const HomeScreen = () => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

        const navigation = useNavigation();


        useEffect(() => {
            // Request gallery permissions when the component mounts
            (async () => {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(status === 'granted');
            })();
        }, []);

        const playButton = () => {
            navigation.navigate('VisionTester');
        }

        const htpButton = () => {
            navigation.navigate('HowToPlay');
        }


        const openGallery = async () => {
            if (hasGalleryPermission !== 'granted') {
                console.log('Permission to access gallery was denied');
                return;
            }


            const options = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            };

            let result = await ImagePicker.launchImageLibraryAsync(options);


            if (!result.cancelled) {
                // Handle the selected image
                const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
                navigation.navigate('VisionTester', { imageBase64: `data:image/jpeg;base64,${base64}` });


            }
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
