import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function CreateUserAccount(props) {
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');
    const [numTel, setNumTel] = useState('');
    const [isValid, setIsValid] = useState(true);

    const inputHandlerPhone = (phoneNumber) => {
        const phoneNumberPattern = /^\d{10}$/;
        setIsValid(phoneNumberPattern.test(phoneNumber));
        setNumTel(phoneNumber);
    };
    const sendRequest = async (url, method, body, headers) => {
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (e) {
            console.error("Fetch error: ", e.message);
            throw e;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let reponseData = null;
        try {
           
            reponseData = await sendRequest(
                "https://barter-go-api.onrender.com/api/users",
                "POST",
                JSON.stringify({
                    firstName:prenom,
                    lastName:nom,
                    email: email,
                    rawPassword: motdepasse,
                    
                }),
                {
                    "Content-Type": "application/json",
                }
            );
           
            

            if (reponseData != null) {
                alert("Creation of account succefull!");
                setNom("");
                setPrenom("");
                setEmail("");
                setNumTel("");
                setMotDePasse("");
                setUserType("");
                history.push('/login');

            } else {
                alert("Creation of account failed. Please try again later.");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred while attempting to creating your account.");
            alert(err);
           
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Création de Compte</Text>
            
            <TextInput 
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput 
                style={styles.input}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />
            <TextInput 
                style={styles.input}
                placeholder="Courriel"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input}
                placeholder="Mot de Passe"
                value={motdepasse}
                onChangeText={setMotDePasse}
                secureTextEntry={true}
            />
           
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Créer un compte" 
                    onPress={handleSubmit} 
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Connexion" 
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
}

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
        borderRadius: 8,
        overflow: 'hidden',
        padding: 10, 
        marginBottom: 10,
    },
});

export default CreateUserAccount;
