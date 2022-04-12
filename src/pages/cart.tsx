import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

interface productData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

function Cart({ route }: any) {
    const [cartItems, setCartItems] = useState<productData[]>([]);
    const navigator = useNavigation();

    useEffect(() => {
        if (route.params.item) {
            setCartItems(route.params.item);
        } else if (route.params.item === 0) {
            setCartItems([])
        }
    }, []);

    const removeItem = async (idItem: number) => {
        const i = cartItems;
        const aux = i.findIndex((item: { id: number; }) => item.id === idItem);
        i.splice(aux, 1);
        setCartItems(i);
        navigator.navigate("cart", { item: cartItems });
    };

    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Esse e seu carrinho, Let's Ride!</Text>
            </View>
            <View style={styles.cartContainer}>
                {cartItems.length === 0 ? <Text style={styles.alert}>Não tem nada no seu carrinho</Text> :
                    cartItems.map(item => {
                        return (
                            <View key={item.id} style={styles.productView}>
                                <View style={styles.imageView}>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: item.image }}
                                    />
                                </View>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productPrice}>{`$${item.price}`}</Text>
                                </View>
                                <View style={styles.removeButton}>
                                    <TouchableOpacity>
                                        <MaterialIcons
                                            name="highlight-remove"
                                            size={25}
                                            color="red"
                                            onPress={() => {
                                                removeItem(item.id);
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}

export default Cart;

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%",
        display: 'flex',
        position: "relative",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#d9d9d9"
    },
    title: {
        fontFamily: "Roboto_400Regular",
        fontSize: 20,
        fontWeight: "bold",
        color: "#B84A62"
    },
    cartContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        marginTop: 20,
        fontFamily: "Roboto_400Regular",
        fontSize: 15,
        fontWeight: "bold",
        color: "#54457F"
    },
    productView: {
        width: '90%',
        height: 150,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#d9d9d9"
    },
    imageView: {
        width: '25%',
        paddingRight: 20
    },
    productInfo: {
        width: '65%',
        flexDirection: 'column'
    },
    productTitle: {
        fontFamily: "Roboto_400Regular",
        color: "#54457F",
        fontSize: 15,
        paddingRight: 10
    },
    productPrice: {
        fontFamily: "Roboto_400Regular",
        fontWeight: "bold",
        color: "#7C5060",
        fontSize: 20,
        paddingTop: 10
    },
    removeButton: {
        width: '10%'
    }
})
