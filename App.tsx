import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import api from "./services/api"

export default function App() {

  const getProducts = () => {
    const result = api.get('/');
    console.log(result)
  }

  getProducts()

  return (
    <View style={styles.container}>
      <Text>Hello World! This is LuExpress</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
