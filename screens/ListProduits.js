import { View, FlatList, StyleSheet, Text, Button } from "react-native"
import { PRODUCTS } from "../constants/dummy-data"
import CardProduits from "../components/UI/CardProduit"

function ListProduits({ route, navigation, categoryId, categoryTitle }) {
    const catId = route.params.categoryId;

    const displayedProducts = PRODUCTS.filter((productItem) => {
        return productItem.category == catId;
    })
    function renderProduct(itemData) {

        return <CardProduits title={itemData.item.title} color={itemData.item.color} />
    }

    function addProduits() {
        navigation.navigate("addProduits")
    }

    return (<View style={styles.root}>
        <FlatList data={displayedProducts} keyExtractor={(item) => item.id} renderItem={renderProduct} numColumns={2} />
        <View style={styles.rootButton}>
            <Button style={styles.button} title="Ajouter Pro" onPress={addProduits}/>
        </View>
    </View>)
}

export default ListProduits

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#f0f0f0',
        
    },
    text: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        padding: 12,
    },
    button: {
        padding: 16
    },
    rootButton : {
        width: 250
    }
})
