import { View, StyleSheet, Text } from "react-native"
import Title from "./Title";

// Affichage d'un produit

const styles = StyleSheet.create({
    rootContainer : {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: 180, // Set the width to your desired value
        height: 180, // Set the height to your desired value
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    titleText:{
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Helvetica Neue',
        padding: 12,
        textAlign: 'center',
        
    }
});

function CardProduits({title, image, color}) {
    return (
    <View style={[styles.rootContainer, {backgroundColor: color}]}>
        <Text style={styles.titleText}>{title}</Text>
    </View>
    ) 
}

export default CardProduits;
