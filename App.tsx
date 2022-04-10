import React from "react";
import HeaderRoutes from "./src/components/headerRoutes";
import Products from "./src/content/product";
import { SafeAreaView, ScrollView, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Footer from "./src/components/footer";

function App() {
  return (
    <NavigationContainer>
      <HeaderRoutes />
    </NavigationContainer>
  )
}

export default App;