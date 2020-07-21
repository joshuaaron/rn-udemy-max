import React from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { appTheme } from '../constants/colors';
import { CartItem } from '../components/shop/CartItem';
import { removeFromCart } from '../store/actions/cart';

export const CartScreen = (props) => {
    const cartTotal = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => Object.keys(state.cart.items)
        .map(key => ({ ...state.cart.items[key], productId: key }) ))
        .sort((a, b) => a.productId > b.productId ? 1 : -1);

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    <Text style={styles.amount}>${cartTotal.toFixed(2)}</Text>
                </Text>
                <Button title='Order Now' color={appTheme.accent} disabled={!cartItems.length} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={({ item }) => (
                    <CartItem 
                        quantity={item.quantity}
                        title={item.title}
                        amount={item.price}
                        onRemove={() => dispatch(removeFromCart(item.productId))}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: appTheme.primary
    },
    cartItems: {

    },
});