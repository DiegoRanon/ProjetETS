import { View, StyleSheet, Text, Pressable } from "react-native"
import Title from "./Title";
import { useState } from "react";
import IconButton from "./IconButton"

// Affichage d'un produit

const styles = StyleSheet.create({
    rootContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        margin: 6,
        width: 172, // Set the width to your desired value
        height: 172, // Set the height to your desired value
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Helvetica Neue',
        padding: 12,
        textAlign: 'center',

    },
    iconButton: {
        flex:1
    }
});

function CardProduits({ title, image, color, onPress, onDelete }) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };
    
    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <View style={[styles.rootContainer]}>
            <Pressable 
                onPress={onPress} 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [
                    styles.rootContainer,
                    {
                      backgroundColor: pressed || isPressed ? 'lightblue' : color,
                    },
                  ]}
            >
                <Text style={styles.titleText}>{title}</Text>
            </Pressable>
        </View>
    )
}

export default CardProduits;
