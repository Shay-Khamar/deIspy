import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const squareSize = Math.min(windowWidth, windowHeight) * 0.25; // 20% of the smaller dimension

const GuessCounter = ({ chancesLeft }) => {
    return (
        <View style={[styles.container, { width: squareSize, height: squareSize }]}>
            <Text style={styles.text}>{chancesLeft}</Text>
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
};

export default GuessCounter;
