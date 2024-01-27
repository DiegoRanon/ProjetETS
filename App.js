import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Title from './components/UI/Title';
import ListProduits from './screens/ListProduits';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native'



export default function App() {
  return (
    <View style={styles.container}>
      {
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      }

      {/*<ListProduits style={styles.list}/>*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center"
  },
  text: {
    paddingTop: 30,
    fontSize: 22,
    alignContent: 'center'
  },
  list: {
    paddingTop: 30
  }
});
