import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, Button } from "react-native"

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


    useEffect(() => {
        api
            .get("/products")
            .then(res => {
                setProducts(res.data)
                console.log("Segundo log ", products)
            })
            .catch(err => console.log(err))
    }, [])

    console.log("terceiro log: ", products)
    return (
        <View style={styles.container}>

            {products.map(product => {
                return (
                    <View key={product.id} style={styles.productView}>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }} />
                        <Text>{product.title}</Text>
                        <Text>{product.price}</Text>
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


