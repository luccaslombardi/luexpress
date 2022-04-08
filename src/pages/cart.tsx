import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import Products from '../content/product' 

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

function Cart({route}:any) {
    const [cartItems, setCartItems] = useState<productData[]>([route.params?.item])
    

   useEffect(() => {
        if(cartItems.length === 1) {
            console.log("Não tem nada no carrinho")
        } else {
            console.log("Tem", cartItems)
        }
   }, [])

    return (
        <View>
           <Text>Oi</Text>
        </View>
    )   
}

export default Cart