import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/home';
import Cart from '../pages/cart';

const Stack = createStackNavigator()

function HeaderRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    title: "HOME",
                }}
            />

            <Stack.Screen
                name="cart"
                component={Cart}
                options={{
                    title: "CART"
                }}
            />


        </Stack.Navigator>

    )

}

export default HeaderRoutes