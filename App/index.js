// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native';

const targetColors = ["red", "green", "blue", "yellow", "purple"];
const initialColors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "black", "white"];

const Colors = ({ colors, onColorPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.colorBox, { backgroundColor: item }]} 
            onPress={() => onColorPress(item)}
        />
    );

    return (
        <FlatList
            data={colors}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={5}
            contentContainerStyle={styles.list}
        />
    );
};

const App = () => {
    const [collectedColors, setCollectedColors] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleColorPress = (color) => {
        if (!collectedColors.includes(color) && targetColors.includes(color)) {
            setCollectedColors([...collectedColors, color]);
            if (collectedColors.length + 1 === targetColors.length) {
                setShowConfetti(true);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Color Sorting Game</Text>
            <Text style={styles.instructions}>Collect these colors: {targetColors.join(", ")}</Text>
            <Colors colors={initialColors} onColorPress={handleColorPress} />
            {showConfetti && <Confetti />}
        </SafeAreaView>
    );
}

const randomValue = (min, max) => Math.random() * (max - min) + min;

const Confetti = () => {
    return (
        <View style={styles.container}>
            {[...Array(50)].map((_, i) => (
                <Animated.View
                    key={i}
                    style={[
                        styles.confetti,
                        {
                            backgroundColor: `hsl(${randomValue(0, 360)}, 100%, 50%)`,
                            top: randomValue(0, 100) + '%',
                            left: randomValue(0, 100) + '%',
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
    },
    list: {
        alignItems: 'center',
    },
    colorBox: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 10,
    },
    confetti: {
        position: 'absolute',
        width: 10,
        height: 20,
        borderRadius: 3,
        transform: [{ rotate: '45deg' }],
        opacity: 0.7,
    },
});

export default App;