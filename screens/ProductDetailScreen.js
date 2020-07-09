import React from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { appTheme } from '../constants/colors';
import * as cartActions from '../store/actions/cart';

export const ProductDetailScreen = ({ route, navigation }) => {
    const id = route.params.productId;
    const selected = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === id));

    const dispatch = useDispatch();

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{ uri: selected.imageUrl }} />
            <View style={styles.btnContainer}>
                <Button color={appTheme.primary} title='Add to Cart' onPress={() => {
                    dispatch(cartActions.addToCart(selected))
                }} />
            </View>
            <Text style={styles.price}>${selected.price}</Text>
            <Text style={styles.desc}>{selected.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {},
    btnContainer: {
        marginVertical: 5,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 250
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    desc: {
        fontSize: 15,
        marginHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'open-sans',
    },
});