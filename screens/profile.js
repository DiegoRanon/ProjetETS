import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TextInput, Button } from 'react-native';
import CardProduits from '../components/UI/CardProduit';
import IconButton from '../components/UI/IconButton';
import { useHttpClient } from "../shared/hooks/http-hook";

const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`https://barter-go-api-qpo1.onrender.com/api/users/${userId}`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error('Failed to fetch user profile: ' + response.status + ' - ' + errorBody);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'There was an error fetching user profile');
        return null;
    }
};

const fetchUserProducts = async (userId) => {
    try {
        const response = await fetch(`https://barter-go-api-qpo1.onrender.com/api/barter-items/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        return data.barterItems;
    } catch (err) {
        console.error(err);
        setError(err.message);
        return [];
    }
};

function Profile({ route, navigation }) {
    const userId = route.params.userId;
    const [userProducts, setUserProducts] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const { sendRequest, clearError } = useHttpClient();
    useEffect(() => {
        const loadUserProfile = async () => {
            const profile = await fetchUserProfile(userId);
            setUserProfile(profile);
        };

        const loadUserProducts = async () => {
            const products = await fetchUserProducts(userId);
            setUserProducts(products);
        };

        if (userId) {
            loadUserProducts();
            loadUserProfile();
        }
    }, [userId]);

    function renderProductItem(itemData) {
        const deleteProduit = async () => {
            try {
                const response = await sendRequest(`https://barter-go-api-qpo1.onrender.com/api/barter-items/${itemData.item.id}`, "DELETE");
            
                alert("Produit supprimée")

            } catch (err) {
                console.error(err); // Log the error to the console
                setError(err.message);
            }
        }

        return (
            <View>
                <CardProduits
                    title={itemData.item.title}
                    color={itemData.item.color}
                />
                <Button title='Delete' color={"red"} onPress={deleteProduit}/>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {userProfile && (
                <View style={styles.profileContainer}>
                    <Text style={styles.profileLabel}>Nom:</Text>
                    <TextInput
                        style={[styles.profileText, styles.textInput]}
                        value={userProfile.firstName + " " + userProfile.lastName}
                        placeHolder="Nom complet"
                    />


                    <Text style={styles.profileLabel}>Email:</Text>
                    <TextInput
                        style={[styles.profileText, styles.textInput]}
                        value={userProfile.email}
                        placeHolder="Courriel"
                    />

                </View>
            )}
            <View style={styles.productsContainer}>
                <Text style={styles.title}>Mes Produits</Text>

                <FlatList
                    data={userProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProductItem}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileText: {
        fontSize: 18,
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Helvetica Neue',
        padding: 12,
        textAlign: 'left',
    },
    profileLabel: {
        fontSize: 18,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        marginBottom: 5,  // Add marginBottom for spacing
        textAlign: 'left',
    },
    profileContainer: {
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '100%',
        marginTop: 10,
        borderBottomWidth: 0.5,  // Add a borderBottomWidth
        borderBottomColor: '#ccc',  // Add a borderBottomColor for the line
        paddingBottom: 2,
        padding: 3,
    },
    productsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
});

export default Profile;
