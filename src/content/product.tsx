import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Text, Image, View, StyleSheet, TouchableOpacity, Button } from "react-native"
import {  useNavigation } from '@react-navigation/native'
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
    const [cartItems, setCartItems] = useState<productData[]>([])
    const navigator = useNavigation()


    useEffect(() => {
        api
            .get("/products")
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const cartHaveProduct = async (lastProduct: number, product:any) => {
        if(lastProduct.length === 0) {
            setCartItems(product)
            console.log("Nâo tinha antes" ,cartItems)
            navigator.navigate("cart", {item: cartItems})

        } else {    
                lastProduct.push(product)
                setCartItems(lastProduct)
                console.log("Tinha antes, esse é mais um", cartItems)
            navigator.navigate("cart", {item: cartItems})

        }
    }


    return (
        
        <View style={styles.container}>
        
            {products.map(product => {
                return (
                    <View key={product.id} style={styles.productView}>
                        <TouchableOpacity >
                        <Image style={{ width: 100, height: 100 }} source={{ uri: product.image }}  />
                        </TouchableOpacity>
                        <Text>{product.title}</Text>
                        <Text>{product.price}</Text>
                        <Button 
                        title={"Luccas"}  
                        onPress={()=> {
                            cartHaveProduct(cartItems,product)
                            
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


