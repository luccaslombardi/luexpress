import React from "react";
import HeaderRoutes from "./src/components/headerRoutes";
import Products from "./src/content/product";
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

function App() {
  return (
    <NavigationContainer>
    <HeaderRoutes />
    </NavigationContainer>
  )
}

export default App;