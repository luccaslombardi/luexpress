import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, TouchableOpacity, Button } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Cart from "../pages/cart";

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

    const cartHaveProduct = async (lastProduct: [], product: any) => {
        lastProduct.push(product)
        console.log(cartItems)
        navigator.navigate("header", { item: cartItems })

    }



    return (

        <View style={styles.container}>

            {products.map(product => {
                return (
                    <View key={product.id} style={styles.productView}>
                        <TouchableOpacity >
                            <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }} />
                        </TouchableOpacity>
                        <Text>{product.title}</Text>
                        <Text>{product.price}</Text>
                        <Button
                            title={"Add to Cart"}
                            onPress={() => {
                                cartHaveProduct(cartItems, product)

                            }
                            } />
                    </View>
                )
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
    }

})


