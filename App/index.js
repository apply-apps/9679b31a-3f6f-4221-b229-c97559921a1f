// Filename: index.js
// Combined code from all files

// Filename begin: App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native';

const targetColors = ["red", "green", "blue", "yellow", "purple"];
const initialColors = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "black", "white"];

const ConfettiPiece = ({ delay, duration, initialX, initialY }) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

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
                styles.confetti,
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
        <View style={styles.container}>
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

const Colors = ({ colors, onColorPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[colorsStyles.colorBox, { backgroundColor: item }]} 
            onPress={() => onColorPress(item)}
        />
    );

    return (
        <FlatList
            data={colors}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={5}
            contentContainerStyle={colorsStyles.list}
        />
    );
};

export default function App() {
    const [collectedColors, setCollectedColors] = useState([]);
    const [targetIndex, setTargetIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleColorPress = (color) => {
        if (color === targetColors[targetIndex] && !collectedColors.includes(color)) {
            setCollectedColors([...collectedColors, color]);
            if (targetIndex < targetColors.length - 1) {
                setTargetIndex(targetIndex + 1);
            } else {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000); // Confetti disappears after 3 seconds
            }
        }
    };

    return (
        <SafeAreaView style={appStyles.container}>
            <Text style={appStyles.title}>Color Sorting Game</Text>
            <Text style={appStyles.instructions}>Select this color: {targetColors[targetIndex]}</Text>
            <Colors colors={initialColors} onColorPress={handleColorPress} />
            {showConfetti && <Confetti />}
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
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
});

const colorsStyles = StyleSheet.create({
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
// Filename end: App.js, Colors.js, Confetti.js