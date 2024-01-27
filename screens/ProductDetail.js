import { View, StyleSheet, ScrollView, Text } from "react-native"
import { PRODUCTS } from "../constants/dummy-data"
import { Title } from "../components/UI/Title"


function ProductDetail({ navigation, route }) {
    // const product = route.params.product;

    const product = PRODUCTS[1];



    return (<View style={styles.root}>
        <ScrollView>
            <Text style={styles.text}>{product.title}</Text>
            <View style={styles.rootDescription}>
                <Text>Description: </Text>
                <Text numberOfLines={5}>{product.description}</Text>
            </View>
            {/*image a ajouter */}
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
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    
})