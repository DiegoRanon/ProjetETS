        import { View, StyleSheet, TextInput, Text, Button, ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useHttpClient } from "../shared/hooks/http-hook";
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';



function AddProduits({ navigation, route }) {
    const userId = route.params.userId;

    const { error, sendRequest, clearError } = useHttpClient();

    //DropDown data
    const data = [
        { label: 'Électronique', value: 1 },
        { label: 'Vêtement et accessoire', value: 2 },
        { label: 'Mobilier', value: 3 },
    ];

    // States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [category, setCategory] = useState(0)

    //Fields
    const BASE_URL = "https://barter-go-api-qpo1.onrender.com/api/barter-items";

    //Functions
    const handleOpenImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
    
        try {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!pickerResult.cancelled) {
                setImage(pickerResult.assets[0].uri);
                setSelectedImage(pickerResult.assets[0].uri)

            }
            console.log(pickerResult)
        } catch (error) {
            console.log(error);
            alert('An error occurred while picking the image.');
        }
    };


        /** 
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        */
        /** 
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = image?.uri;
                setSelectedImage(imageUri);
            }
        });
        */
    

    //Events
    const handleSubmit = async (event) => {
        event.preventDefault();
        let imageUrl = '';
    
        if (selectedImage) {
            const uploadUri = selectedImage;
            let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
            // Add timestamp to file name
            const extension = filename.split('.').pop(); 
            const name = filename.split('.').slice(0, -1).join('.');
            filename = name + Date.now() + '.' + extension;
    
            const storageRef = storage().ref(`images/${filename}`);
            const task = storageRef.putFile(uploadUri);
    
            try {
                await task;
                imageUrl = await storageRef.getDownloadURL();
                console.log('Image URL:', imageUrl);
            } catch (e) {
                console.error(e);
                return;
            }
        }
    
        try {
            const responseData = await sendRequest(
                BASE_URL,
                "POST",
                JSON.stringify({
                    title: title,
                    imageName: "imageUrl", 
                    description: description,
                    address: address,
                    userId: userId,
                    category: category
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            alert("Product created");
            navigation.replace("Produits", {userId:userId})
        } catch (err) {
            alert(err);
        }
    };
    

    return (<View style={styles.container}>
        <Text style={styles.header}>Donner une nouvelle vie à un produit!</Text>

        <TextInput
            style={styles.input}
            placeholder="Titre"
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
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
        />
        
        
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner la catégorie"
            searchPlaceholder="Search..."
            value={category}
            onChange={item => {
                setCategory(item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
        />

        <View style={styles.buttonContainer}>
            <Button
                title="Créer Produit"
                onPress={handleSubmit}
            />
        </View>
    </View>
    )
            
};
export default AddProduits;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
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
        width: '105%',
        overflow: 'hidden',
        padding: 10,
        marginBottom: 10,
    },
    dropdown: {
        margin: 16,
        height: 50,
        width: '100%',
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
})