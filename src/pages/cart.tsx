import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, Button } from "react-native";
import Products from "../content/product";
import { useNavigation } from "@react-navigation/native";

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
            setCartItems(route.params?.item);
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
        <View>
            <Text>Até aqui de boa, certo?</Text>

            {cartItems.map(item => {
                return (
                    <View key={item.id}>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: item.image }}
                            />
                        </TouchableOpacity>
                        <Text>{item.title}</Text>
                        <Text>{item.price}</Text>
                        <Button
                            title={"Remove"}
                            onPress={() => {
                                removeItem(item.id);
                            }}
                        />
                    </View>
                );
            })}
        </View>
    );
}

export default Cart;
