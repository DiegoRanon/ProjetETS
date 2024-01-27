import { View, FlatList, StyleSheet, Text } from "react-native"
import { PRODUCTS } from "../constants/dummy-data"
import CardProduits from "../components/UI/CardProduit"

function ListProduits() {

    function renderProduct(itemData) {
        return <CardProduits title={itemData.item.title} />
    }
    
    return (<View style={styles.root}><FlatList data={PRODUCTS} renderItem={renderProduct} numColumns={2}/></View>)
}

export default ListProduits

const styles = StyleSheet.create({
    root : {
        flex: 1
    },
    text :{
        fontSize: 18,
        fontFamily: "Century Gothic",
        padding: 12,
    }
})
