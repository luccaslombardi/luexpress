import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { Feather, AntDesign } from '@expo/vector-icons'
import Home from '../pages/home';

const Stack = createStackNavigator()

function HeaderRoutes() {
    return (
        <NavigationContainer>

            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{
                        title: "HOME",
                        headerRight: () => {
                            return (
                                <TouchableOpacity style={{ marginRight: 15 }}>
                                    <AntDesign
                                        name="shoppingcart"
                                        size={25}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            )
                        }
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HeaderRoutes