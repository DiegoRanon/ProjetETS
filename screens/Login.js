import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { useNavigation } from '@react-navigation/native';

function Login(props) {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');

    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false
            },
            motdepasse: {
                value: "",
                isValid: false
            },
        },
        false
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        let reponseData = null;

        try {
           
            reponseData = await sendRequest(
                "http://localhost:5000/user/email/motdepasse",
                "POST",
                JSON.stringify({
                    email: email,
                    motdepasse: motdepasse,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            if (reponseData.success) {

                console.log("Connecter")
                history.push('/home');
                auth.login(reponseData.etudiant.id);
            }  else {
                    alert("Compte inexistant.");
                }
            
            } catch (err) {
            console.log(err);
            alert("An error noccurred while attempting to log in.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Courriel"
                    value={email}
                    onChangeText={setEmail}
                    onInput={inputHandler}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de Passe"
                    secureTextEntry
                    value={motdepasse}
                    onChangeText={setMotDePasse}
                    onInput={inputHandler}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Connexion" onPress={handleSubmit} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Créer un compte" onPress={() => navigation.navigate('Register')}/>
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
    title: {
        fontSize: 24,
        fontFamily: 'Helvetica Neue',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
        width: '100%',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8, 
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonContainer: {
        width: '100%', 
        borderRadius: 8,
        overflow: 'hidden',
        padding: 10, 
        marginBottom: 10,
    },
});

export default Login;
