import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/home';
import Cart from '../pages/cart';
import { Image, Text, StyleSheet } from "react-native";
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading'

const Stack = createStackNavigator()

function HeaderRoutes() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"

                component={Home}
                options={{

                    headerTitle: () => {
                        return (
                            <Image
                                source={require("../../assets/logo.png")}
                                style={{ width: 150, height: 70 }}
                            />
                        )

                    },
                    headerRight: () => {
                        return (
                            <Text style={styles.date}>{currentDate}</Text>
                        )
                    }
                }}

            />

            <Stack.Screen
                name="cart"
                component={Cart}
                options={{
                    headerTitle: () => {
                        return (
                            <Image
                                source={require("../../assets/logo.png")}
                                style={{ width: 150, height: 70 }}
                            />
                        )

                    },
                    headerRight: () => {
                        return (
                            <Text style={styles.date}>{currentDate}</Text>
                        )
                    }

                }}
            />


        </Stack.Navigator>

    )

}

export default HeaderRoutes

const styles = StyleSheet.create({
    date: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        paddingRight: 15,
        color: "#54457F"
    }
})