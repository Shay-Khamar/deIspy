
/**
 * @file Represents the LeaderBoardScreen component.
 * @module LeaderBoardScreen
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colours from '../../colours';

/**
 * Represents the leaderboard data.
 * @type {Array<{name: string, score: number}>}
 */
const data = [
    { name: 'Sherlock Holmes', score: 100 },
    { name: 'Hercule Poirot', score: 95 },
    { name: 'Nancy Drew', score: 90 },
    { name: 'Miss Marple', score: 85 },
    { name: 'Philip Marlowe', score: 80 },
    { name: 'Inspector Clouseau', score: 75 },
    { name: 'Sam Spade', score: 70 },
    { name: 'C. Auguste Dupin', score: 65 },
    { name: 'Dirk Gently', score: 60 },
    { name: 'Ellery Queen', score: 55 },
    { name: 'Father Brown', score: 50 },
    { name: 'Harry Hole', score: 45 },
    { name: 'Adam Dalgliesh', score: 40 },
    { name: 'Jules Maigret', score: 35 },
    { name: 'Alex Cross', score: 30 },
    { name: 'Charlie Parker', score: 25 },
    { name: 'Kinsey Millhone', score: 20 },
    { name: 'Perry Mason', score: 15 },
    { name: 'V.I. Warshawski', score: 10 },
    { name: 'Lisbeth Salander', score: 5 }
];

/**
 * Represents the Leaderboard component.
 * @returns {JSX.Element} The rendered component.
 */
const Leaderboard = () => {

    return (
        <View style={styles.container}> 
            <View style={styles.board}>
                <Text style={styles.title}>Top <Ionicons name="ios-search" size={24} color={colours.primaryColour} /> Detectives</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.name}
                    renderItem={({item}) => (
                        <View style={styles.row}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.score}>{item.score} <Ionicons name="star" size={16} color="gold" /></Text> 
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 1,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center', 
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    }, 
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 16,
    } 
});

export default Leaderboard;