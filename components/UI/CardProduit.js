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
    },
    titleText:{
        fontSize: 22,
        fontWeight: "bold",
        fontFamily: "Century Gothic",
        padding: 12,
    }
});

function CardProduits({title, image}) {
    return (<View style={styles.rootContainer}>
        <Text style={styles.titleText}>{title}</Text>
    </View>) 
}

export default CardProduits;
