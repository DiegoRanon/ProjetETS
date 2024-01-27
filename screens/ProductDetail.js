import { View, StyleSheet, ScrollView, Text, Button } from "react-native"
import { PRODUCTS } from "../constants/dummy-data"
import { Title } from "../components/UI/Title"


function ProductDetail({ navigation, route }) {
    // const product = route.params.product;

    const product = PRODUCTS[1];



    return (<View style={styles.root}>
        <ScrollView>
            <Text style={styles.text}>{product.title}</Text>
            <View style={styles.rootDescription}>
                <Text style={styles.descriptionLabel}>Description: </Text>
                <Text style={styles.descriptionText} numberOfLines={5}>{product.description}</Text>
            </View>
            {/*image a ajouter */}

            <View style={styles.buttonContainer} >
                <Button title="Demande d'echange" onPress={() => console.log("Demande d'echange pressed")} />
            </View>
        </ScrollView>
    </View>)
}

export default ProductDetail

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center"
    },
    text: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: 'Helvetica Neue',
        padding: 12,
    },
    rootDescription: {
        padding : 50,
        margin: 10,
        height: 250,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    descriptionLabel: {
        fontSize: 16,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    descriptionText: {
        fontSize: 16,
    },
    buttonContainer: {
        width: '100%', 
        borderRadius: 8,
        overflow: 'hidden',
        padding: 10, 
        marginBottom: 10,
    },
})