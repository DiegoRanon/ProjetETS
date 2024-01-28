import { PRODUCTS } from "../constants/dummy-data"
import { Title } from "../components/UI/Title"
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Button, Image, Modal, TextInput } from 'react-native';
import { useEffect } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";

function ProductDetail({ navigation, route }) {
    const product = route.params.product;
    const userId = route.params.userId;

    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://barter-go-api-qpo1.onrender.com/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setFormData({
                    ...formData,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'There was an error fetching user data');
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [userId]);


    
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = async (event) => {
        let reponseData = null;
        try {
           
            reponseData = await sendRequest(
                "https://barter-go-api-qpo1.onrender.com/api/users/demandeEchange",
                "POST",
                JSON.stringify({
                    userId:userId,
                    productId:product.id,
                    message: formData.message
                }),
                {
                    "Content-Type": "application/json",
                }
            );
           
        } catch (err) {
            console.log(err);
            alert("An error occurred while attempting to creating your account.");
            alert(err);
           
        } 
       
    };


    return (<View style={styles.root}>
        <ScrollView>
            <Text style={styles.text}>{product.title}</Text>
            <Image 
                    source={{ uri: product.imageName }} 
                    style={styles.image} 
                />
            <View style={styles.rootTitle}>
            <Text style={styles.descriptionLabel}>Description : </Text>
            </View>
            <View style={styles.rootDescription}>
                <Text style={styles.descriptionText} numberOfLines={5}>{product.description}</Text>
            </View>

            <View style={styles.buttonContainer} >
            <Button title="Demande d'échange" onPress={() => setModalVisible(true)} />
            </View>
        </ScrollView>
        <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="First Name"
                        style={styles.input}
                        value={formData.firstName}
                        editable={false}
                    />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.input}
                        value={formData.lastName}
                        editable={false}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={formData.email}
                        editable={false} 
                    />
                    <TextInput
                        placeholder="Message"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('message', text)}
                        value={formData.message}
                        multiline
                    />
                    <Button title="Submit" onPress={submitForm} />
                </View>
            </Modal>
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
        textAlign:"center"
    },
    rootDescription: {
        padding : 10,
        margin: 10,
        height: 200,
        width: 300,
        borderRadius: 8,
        elevation: 8,
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderWidth: 3
    },
    descriptionLabel: {
        fontSize: 16,
        fontWeight: "bold"

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

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    rootTitle : {
        padding : 10,
        alignItems: "center"
    }
});