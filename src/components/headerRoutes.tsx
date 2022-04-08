import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Home from '../pages/home';
import Cart from '../pages/cart';


const Stack = createStackNavigator()

function HeaderRoutes() {
    const navigator = useNavigation()

    return (

            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{
                        title: "HOME",
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    style={{ marginRight: 15 }}
                                >
                                    <AntDesign
                                        name="shoppingcart"
                                        size={25}
                                        color="black"
                                        onPress={()=> navigator.navigate('cart')}
                                    />
                                </TouchableOpacity>
                            )
                        }
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