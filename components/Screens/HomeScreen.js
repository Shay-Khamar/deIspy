import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {

        const navigation = useNavigation();

        const playButton = () => {
            navigation.navigate('VisionTester');
        }

        const htpButton = () => {
            navigation.navigate('HowToPlay');
        }










    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            <View style={styles.buttonContainer}>
            <ThemedButton name="bruce" type="secondary" style={styles.button} width={100} onPressOut={htpButton}>How To Play</ThemedButton>
            <ThemedButton name="bruce" type="primary" style={styles.button} width={100} onPressOut={playButton}>Play</ThemedButton>
            <ThemedButton name="bruce" type="secondary" style={styles.button} width={100}>Open Gallery </ThemedButton>
            {/* Add your content here */}
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
