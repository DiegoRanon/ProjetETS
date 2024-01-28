import { View,FlatList, StyleSheet } from "react-native"
import { useHttpClient } from "../shared/hooks/http-hook";
import CardProduits from "../components/UI/CardProduit"

function demande() {
 
    function renderDemande(itemData) {
        function DetailProduit() {
            navigation.navigate("DetailProduit", { product: itemData.item, userId: userId})
        }
        return <CardProduits title={itemData.item.title} color={itemData.item.color} onPress={DetailProduit} />
    }


    return (
    <View style={styles.container}> 

        <FlatList data={filteredProducts} keyExtractor={(item) => item.id} renderItem={renderDemande} numColumns={2} />
   
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        backgroundColor: '#FAFAFA',

    }
})