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

    const handleSubmit = async () => {
        
    };

    return (
        <View style={styles.container}>
            <Text>Connexion</Text>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
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
            <Button title="Connexion" onPress={handleSubmit} />
            {}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formGroup: {
        marginBottom: 15
    },
    input: {
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10
    }
});

export default Login;
