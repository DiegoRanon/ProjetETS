import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import React, { useState } from 'react';

function addProduits({ navigation }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState(0)


    const handleSubmit = async (event) => {
        event.preventDefault();
        let reponseData = null;
        try {
            reponseData = await sendRequest(
                "https://barter-go-api.onrender.com/api/barter-items",
                "POST",
                JSON.stringify({
                    title: title,
                    imageName: image,
                    description: description,

                }),
                {
                    "Content-Type": "application/json",
                }
            );



            if (reponseData != null) {


            } else {
                alert("Creation of account failed. Please try again later.");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred while attempting to creating your account.");
            alert(err);

        }
    };

    return (<View style={styles.container}>
        <Text style={styles.header}>Creation of Product</Text>

        <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
        />
        <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
        />
        <TextInput
            style={styles.input}
            placeholder="Mot de Passe"
            value={category}
            onChangeText={setCategory}
            secureTextEntry={true}
        />


        <View style={styles.buttonContainer}>
            <Button
                title="Créer Produit"
                onPress={handleSubmit}
            />
        </View>
    </View>)
}

export default addProduits;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        height: '100%',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        overflow: 'hidden',
        padding: 10,
        marginBottom: 10,
    },
})