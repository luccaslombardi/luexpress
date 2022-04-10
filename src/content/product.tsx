import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, TouchableOpacity, Button } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading'

interface productData {
    id: number;
    title: string,
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

function Products() {

    const [products, setProducts] = useState<productData[]>([])
    const cartItems: productData[] = []
    const navigator = useNavigation()



    useEffect(() => {
        api
            .get("/products")
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])



    const addToCart = async (lastProducts: any, product: any) => {
        const findItem = cartItems.find(item => item.id == product.id)

        if (findItem === undefined) {
            lastProducts.push(product)

        } else if (findItem.id === product.id) {
            alert("produto já esta no carrinho")
        }



    }

    const removeFromCart = async (product: any) => {

        const findItem = cartItems.find(item => item.id == product.id)

        if (findItem === undefined) {
            alert("Esse produto não está no carrinho")
        } else if (findItem.id === product.id) {
            const i = cartItems;
            const aux = i.findIndex((item: { id: number; }) => item.id === product.id);
            i.splice(aux, 1);
        }
    }

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (

        <View>
            <View style={styles.firstContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.pageTitle}>Escolha seu produto</Text>

                    <TouchableOpacity>
                        <AntDesign
                            name="shoppingcart"
                            size={30}
                            color="black"
                            style={styles.cartIcon}
                            onPress={() => navigator.navigate('cart', { item: cartItems })}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container}>
                {products.map(product => {

                    return (

                        <View key={product.id} style={styles.productView}>
                            <View style={styles.productImage}>
                                <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }} />
                            </View>
                            <View style={styles.productInfo}>
                                <Text numberOfLines={1} style={styles.productTitle}>{product.title.length < 30 ? product.title : `${product.title.substring(0, 25)}...`}</Text>
                                <Text style={styles.productPrice}>{`$${product.price}`}</Text>
                                <View style={styles.buttonsView}>
                                    <Ionicons
                                        name="remove-circle-outline"
                                        size={30}
                                        color="red"
                                        onPress={() => {
                                            removeFromCart(product)
                                        }}
                                    />
                                    <Ionicons
                                        name="add-circle-outline"
                                        size={30}
                                        color="green"
                                        onPress={() => {
                                            addToCart(cartItems, product)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                    );
                })}
            </View>
        </View>

    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center"

    },
    firstContainer: {
        alignItems: "center"
    },
    titleContainer: {
        margin: "0 auto",
        width: "95%",
        display: 'flex',
        position: "relative",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#d9d9d9"
    },
    pageTitle: {
        fontFamily: "Roboto_400Regular",
        fontSize: 20,
        fontWeight: "bold",
        marginRight: "35%",
        color: "#B84A62"
    },
    cartIcon: {
        color: "#B84A62"
    },
    productView: {
        width: '90%',
        height: 150,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "white",
        padding: 20,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 15
    },
    productImage: {
        width: '40%',
        borderRightWidth: 1,
        borderColor: "#d9d9d9"

    },
    productInfo: {
        width: '60%',
        alignItems: 'center',
    },
    productTitle: {
        fontFamily: "Roboto_400Regular",
        color: "#54457F",
        fontSize: 15
    },
    productPrice: {
        fontFamily: "Roboto_400Regular",
        fontWeight: "bold",
        color: "#54457F",
        fontSize: 25,
        paddingVertical: 10
    },
    buttonsView: {
        flexDirection: "row",
    }
})


