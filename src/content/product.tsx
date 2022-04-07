import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View } from "react-native"

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
        <>
            <Text>Até aqui tudo certo</Text>
            {products.map(product => {
                return (
                    <View key={product.id}>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }} />
                        <Text>{product.title}</Text>
                    </View>
                )
            })}
        </>
    )
}

export default Products



