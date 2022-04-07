import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Home from '../pages/home';

const Stack = createStackNavigator()

function HeaderRoutes() {
    return (
        <NavigationContainer>

        <Stack.Navigator>
            <Stack.Screen name="home" component={Home}/>  
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HeaderRoutes