import { View, StyleSheet, Text, Pressable } from "react-native"

// Affichage d'une categorie

const styles = StyleSheet.create({
    rootContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
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
        
    }
});

function CardCategory({ title, onPress, color }) {
    return (
        <View style={[styles.rootContainer, {backgroundColor: color}]}>
            <Pressable onPress={onPress}>
                <Text style={styles.titleText} numberOfLines={3}>{title}</Text>
            </Pressable>
        </View>
    )
}

export default CardCategory;
