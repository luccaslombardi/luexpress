import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading'
import Footer from "../components/footer";

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

    const addToCart = async (product: any) => {
        const findItem = cartItems.find(item => item.id == product.id)

        if (findItem === undefined) {
            cartItems.push(product)
            Alert.alert(
                "Uhuul!",
                "Seu produto foi adicionado ao carrinho",
                [
                    {
                        text: "Voltar",
                        style: "cancel"
                    },
                    { text: "Ir para carrinho", onPress: () => navigator.navigate('cart', { item: cartItems }) }
                ]
            );
        } else if (findItem.id === product.id) {
            Alert.alert("Ops!", "esse produto já esta no carrinho")
        }
    }

    const removeFromCart = async (product: any) => {
        const findItem = cartItems.find(item => item.id == product.id)

        if (findItem === undefined) {
            Alert.alert("Tem certeza que é esse?", "esse produto não está no carrinho")
        } else if (findItem.id === product.id) {
            const aux = cartItems.findIndex((item: { id: number; }) => item.id === product.id);
            cartItems.splice(aux, 1);
            Alert.alert(
                "Aaaah :(",
                "Seu produto foi removido do carrinho",
                [
                    {
                        text: "Ir para carrinho",
                        onPress: () => navigator.navigate('cart', { item: cartItems })
                    },
                    {
                        text: "Voltar",
                        style: "cancel",
                    }
                ]
            );
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
            <ScrollView>
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
                                        <TouchableOpacity>
                                            <Ionicons
                                                name="remove-circle-outline"
                                                size={30}
                                                color="red"
                                                onPress={() => {
                                                    removeFromCart(product)
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Ionicons
                                                name="add-circle-outline"
                                                size={30}
                                                color="green"
                                                onPress={() => {
                                                    addToCart(product)
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                    <Footer />
                </View>
            </ScrollView>
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
        width: "90%",
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
        borderRadius: 15,
        shadowColor: '#adadad',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

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


