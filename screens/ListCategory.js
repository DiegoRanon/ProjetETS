import { View, FlatList, StyleSheet, Text } from "react-native"
import { CATEGORIES } from "../constants/dummy-data"
import CardCategory from "../components/UI/CardCategory"

function ListCategory({ navigation }) {
    console.log("Category")
    function renderCategory(itemData) {
        function handlerProduct() {
            navigation.navigate('Produits', { categoryId: itemData.item.id, categoryTitle: itemData.item.title });
        }
        return <CardCategory title={itemData.item.title} color={itemData.item.color} onPress={handlerProduct} />
    }

    return (<View style={styles.root}><FlatList data={CATEGORIES} renderItem={renderCategory} numColumns={2} /></View>)
}

export default ListCategory

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center', // Center vertically
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
    }
})
