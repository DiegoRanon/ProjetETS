import { View, FlatList, StyleSheet, Text, Button, TouchableOpacity, Animated } from "react-native"
import { CATEGORIES, PRODUCTS } from "../constants/dummy-data"
import CardProduits from "../components/UI/CardProduit"
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { RNPickerSelect } from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { useLayoutEffect } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import IconButton from "../components/UI/IconButton"
import { TouchableWithoutFeedback } from 'react-native';
import { useEffect } from "react";
import Product from "../models/Product";


function ListProduits({ route, navigation, }) {
    const userId = route.params.userId;
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [products, setProducts] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { sendRequest, clearError } = useHttpClient();

    const fadeAnimation = new Animated.Value(0);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: dropdownVisible ? 1 : 0,
            duration: 600, // Adjust the duration as needed
            useNativeDriver: false,
        }).start();
    }, [dropdownVisible, fadeAnimation]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://barter-go-api-qpo1.onrender.com/api/barter-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                console.log('Fetched Data:', data);


                console.log(data.barterItems);


                setProducts(data.barterItems)
            } catch (err) {
                console.error(err); // Log the error to the console
                setError(err.message);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, []);


    /**const displayedProducts = Array.isArray(products) && selectedCategory === 0 
    ? products
    : products.filter(product => product.category === selectedCategory);
    */
    const displayedProducts = Object.values(products);

    let filteredProducts = [];

    if (selectedCategory != 0) {
        filteredProducts = displayedProducts.filter((productItem) => {
            return productItem.category == selectedCategory;
        })
    } else {
        filteredProducts = displayedProducts;
    }


    function addProduct() {

        navigation.navigate("addProduits", { userId: userId });
    }

    function userHandler() {
        setDropdownVisible(!dropdownVisible);

    }
    const handleProfile = () => {
        console.log('Profil selected');
        setDropdownVisible(false);
        navigation.navigate("Profile", { userId: userId });

    };

    const handleLogout = () => {
        console.log('Déconnexion selected');
        setDropdownVisible(false);
        navigation.replace("Login");

    };

    const handleDemande = () => {
        setDropdownVisible(false)
        navigation.navigate("")

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <IconButton icon={"person"} color={'black'} onPress={userHandler} />
            },
            headerRight: () => {
                return <IconButton icon={"add"} color={'black'} onPress={addProduct} />
            }
        })
    }, [navigation])



    function renderProduct(itemData) {
        function DetailProduit() {
            navigation.navigate("DetailProduit", { product: itemData.item, userId: userId })
        }
        

        return <CardProduits title={itemData.item.title} color={itemData.item.color} onPress={DetailProduit} />
    }

    if (isLoading) {
        return <View style={styles.centered}><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text>An error occurred: {error}</Text></View>;
    }
    const placeholder = {
        label: 'Select an option...',
        value: 1,
    };

    function addProduits() {
        navigation.navigate("addProduits")
    }

    const options = [
        { label: 'Toutes les catégories', value: 0 },
        { label: 'Électroniques', value: 1 },
        { label: 'Vêtements et Accessoires', value: 2 },
        { label: 'Mobiliers', value: 3 },
    ];

    return (<View style={styles.root}>

        {dropdownVisible && (
            <View style={styles.dropdown}>
                <Animated.View
                    style={[
                        styles.dropdown,
                        {
                            opacity: fadeAnimation,
                        },
                    ]}
                >
                    <TouchableOpacity onPress={handleProfile} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDemande} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Demandes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Déconnexion</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )}

        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={options}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={selectedCategory}
            onChange={item => {
                setSelectedCategory(item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
        />
        <FlatList data={filteredProducts} keyExtractor={(item) => item.id} renderItem={renderProduct} numColumns={2} />

    </View>)
}

export default ListProduits

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA',

    },
    text: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        padding: 12,
    },
    button: {
        padding: 16,
    },
    rootButton: {
        width: 250,
        fontFamily: 'Helvetica Neue',
        overflow: 'hidden',
        padding: 10,
        marginBottom: 10,
    },
    dropdown: {
        margin: 16,
        width: '100%',
        flexDirection: 'column',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdownItem: {
        height: 50,  // Adjust the height as needed
        width: '95%',  // Set a fixed width or adjust as needed
        justifyContent: 'center',  // Center the text vertically
        paddingLeft: 10,  // Add padding to the left for better appearance
        backgroundColor: '#ffffff',  // Set background color as needed
        borderRadius: 6,  // Add border radius for rounded corners
        borderWidth: 1,  // Add border width
        borderColor: '#ccc',  // Set border color
        marginBottom: 5,
    },
    dropdownText: {
        fontSize: 16,
        height: 20,
    }
})
