
/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImageManipulator } from 'expo-image-manipulator';
import colours from '../../colours';

/**
 * Home screen component.
 * Renders the home screen with buttons for playing the game, accessing the gallery, and viewing the instructions.
 */
const HomeScreen = () => {
    
    const navigation = useNavigation();

    /**
     * Navigates to the MainScreen screen.
     */
    const playButton = () => {
        navigation.navigate('MainScreen');
    }

    /**
     * Navigates to the HowToPlay screen.
     */
    const htpButton = () => {
        navigation.navigate('HowToPlay');
    }

    /**
     * Navigates to the GalleryScreen.
     */
    const galleryButton = () => {
        navigation.navigate('GalleryScreen');
    }

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    <Text style={{ color: colours.textColour }}>DO YOU KNOW WHAT I'M THINKING<Text/>
                    </Text>
                    <Text style={{ color: colours.primaryColour, fontSize: 40 }}>?</Text>
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <ThemedButton 
                    name="bruce" 
                    type="secondary" 
                    style={styles.button} 
                    width={100} 
                    onPressOut={htpButton}
                    backgroundColor={colours.secondaryColour}
                    textColor='white'
                >
                    How To Play
                </ThemedButton>
                <ThemedButton 
                    name="bruce" 
                    type="primary" 
                    style={styles.button} 
                    width={100} 
                    onPressOut={playButton} 
                    backgroundColor={colours.primaryColour} 
                >
                    Play
                </ThemedButton>
                <ThemedButton 
                    name="bruce" 
                    type="secondary" 
                    style={styles.button} 
                    width={100} 
                    onPressOut={galleryButton}
                    backgroundColor={colours.accentColour}
                >
                    Open Gallery 
                </ThemedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Centers children vertically
        backgroundColor: colours.backgroundColour,
    },
    container: {
        alignItems: 'center',
        backgroundColor : colours.backgroundColour,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,  // Added margin at the top
        alignSelf: 'flex-start',  // Aligns the title to the start of the flex container
        padding: 20,  // Adds padding around the text
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
