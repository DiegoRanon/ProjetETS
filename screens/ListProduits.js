import { View, FlatList, StyleSheet, Text } from "react-native"
import { PRODUCTS } from "../constants/dummy-data"
import CardProduits from "../components/UI/CardProduit"

function ListProduits({route, navigation, categoryId, categoryTitle}) {
    // const catId = route.params.categoryId;

    /** const displayedProducts = PRODUCTS.filter((productItem) => {
        return productItem.category.indexOf(catId) >= 0;
    }) */
    function renderProduct(itemData) {
        return <CardProduits title={itemData.item.title} color={itemData.item.color}/>
    }
    
    return (<View style={styles.root}><FlatList data={PRODUCTS} keyExtractor={(item) => item.id} renderItem={renderProduct} numColumns={2}/></View>)
}

export default ListProduits

const styles = StyleSheet.create({
    root : {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    text :{ 
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        padding: 12,
    }
})
