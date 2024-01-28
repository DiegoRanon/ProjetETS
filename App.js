import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Title from './components/UI/Title';
import ListProduits from './screens/ListProduits';
import Login from './screens/Login';
import Register from './screens/Register.js';
import { NavigationContainer } from '@react-navigation/native'

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';
import ListCategory from './screens/ListCategory.js';
import ProductDetail from './screens/ProductDetail.js';
import addProduits from './screens/addProduits.js';
import Profile from './screens/profile.js';
import demande from './screens/demande.js';

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()



export default function App() {

  let drawerMode = (
    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="ListProduit" component={ListProduits} />
        <Drawer.Screen name="DetailProduit" component={ProductDetail} />
        <Drawer.Screen name="addProduits" component={addProduits} />
        <Drawer.Screen name="Profile" component={Profile} />
        
      </Drawer.Navigator>
    </NavigationContainer>


  )

  let screen = (
    // Page officiel
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Produits" component={ListProduits} />
        <Stack.Screen name="addProduits" component={addProduits} options={({ }) => {
          return {
            title: "Add Product"
          }
        }} />
        <Stack.Screen name="DetailProduit" component={ProductDetail} />
        <Stack.Screen name="Demande" component={demande} />
      </Stack.Navigator>
    </NavigationContainer>


  )

  function addProduct() {

    navigation.navigate("addProduits");
  }

  function userHandler() {
    setDropdownVisible(!dropdownVisible);
  }
  return (
    // Page officiel
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#1111' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#3f2f25' }
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Produits" component={ListProduits} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="addProduits" component={addProduits} options={{
          title: "Add Product",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            alignItems: 'center'
          },
        }} />
        <Stack.Screen name="DetailProduit" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center",
    backgroundColor: '#FAFAFA',
  },
  text: {
    paddingTop: 30,
    fontSize: 22,
    alignContent: 'center',
    fontFamily: 'Helvetica Neue',
  },
  list: {
    paddingTop: 30
  }
});
