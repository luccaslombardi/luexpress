import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, TouchableOpacity, Button, Vibration } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

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
        lastProducts.push(product)
    }

    const removeFromCart = async (idItem: number) => {
        const i = cartItems;
        const aux = i.findIndex((item: { id: number; }) => item.id === idItem);
        i.splice(aux, 1);
    }

    const buttonOnPress = async (product: any, productId: number) => {
        const aux = cartItems.find(item => item.id == productId)

        if (aux === undefined) {
            addToCart(cartItems, product);
            console.log(cartItems)
        } else if (aux.id === productId) {
            removeFromCart(productId)
            console.log(cartItems)

        }
    }

    return (


        <View style={styles.container}>
            <View>
                <Text>HOME PAGE</Text>
                <TouchableOpacity>

                    <AntDesign
                        name="shoppingcart"
                        size={25}
                        color="black"
                        onPress={() => navigator.navigate('cart', { item: cartItems })}
                    />

                </TouchableOpacity>
                <AntDesign />
            </View>

            {products.map(product => {

                return (
                    <View key={product.id} style={styles.productView}>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }} />
                        <Text>{product.title}</Text>
                        <Text>{product.price}</Text>

                        <Button
                            title={"Add to Cart"}
                            color={"green"}
                            onPress={() => {
                                buttonOnPress(product, product.id)
                            }}
                        />

                    </View>
                );
            })}
        </View>

    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        display: 'flex',

    },

    productView: {
        width: "40%",
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "white",
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    viewButtonTrue: {
        display: 'flex'
    },
    viewButtonFalse: {
        display: 'none'
    }

})


