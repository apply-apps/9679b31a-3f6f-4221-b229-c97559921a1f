// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

// Colors Component
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

// Confetti Component
const ConfettiPiece = ({ delay, duration, initialX, initialY }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    }, [animatedValue, duration, delay]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 700],
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, initialX],
    });

    return (
        <Animated.View
            style={[
                confettiStyles.confetti,
                {
                    transform: [
                        { translateY },
                        { translateX },
                    ],
                },
            ]}
        />
    );
};

const Confetti = () => {
    return (
        <View style={confettiStyles.container}>
            {[...Array(50)].map((_, i) => (
                <ConfettiPiece
                    key={i}
                    delay={i * 100}
                    duration={2000}
                    initialX={(Math.random() - 0.5) * 1000}
                    initialY={(Math.random() - 0.5) * 1000}
                />
            ))}
        </View>
    );
};

// App Component
const targetColors = ["red", "green", "blue", "yellow", "purple"];
const initialColors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "black", "white"];

export default function App() {
    const [collectedColors, setCollectedColors] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleColorPress = (color) => {
        if (!collectedColors.includes(color) && targetColors.includes(color)) {
            setCollectedColors([...collectedColors, color]);
            if (collectedColors.length + 1 === targetColors.length) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000); // Confetti disappears after 3 seconds
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

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
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
});

const confettiStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    confetti: {
        position: 'absolute',
        width: 10,
        height: 20,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        borderRadius: 3,
        transform: [{ rotate: '45deg' }],
        opacity: 0.7,
    },
});