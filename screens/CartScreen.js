import React from 'react';
import { View, FlatList, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { appTheme } from '../constants/colors';
import { CartItem } from '../components/shop/CartItem';
import { removeFromCart } from '../store/actions/cart';
import { addOrder } from '../store/actions/orders';
import { Card } from '../components/UI/Card';

export const CartScreen = (props) => {
    const [status, setStatus] = React.useState('idle');
    const cartTotal = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) =>
        Object.keys(state.cart.items).map((key) => ({ ...state.cart.items[key], productId: key }))
    ).sort((a, b) => (a.productId > b.productId ? 1 : -1));

    const dispatch = useDispatch();

    const handleOrder = async () => {
        try {
            setStatus('loading');
            await dispatch(addOrder(cartItems, cartTotal));
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={appTheme.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    <Text style={styles.amount}>${Math.abs(cartTotal.toFixed(2))}</Text>
                </Text>
                <Button
                    title='Order Now'
                    color={appTheme.accent}
                    disabled={!cartItems.length}
                    onPress={handleOrder}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={({ item }) => (
                    <CartItem
                        quantity={item.quantity}
                        title={item.title}
                        deleteable
                        amount={item.price}
                        onRemove={() => dispatch(removeFromCart(item.productId))}
                    />
                )}
            />
        </View>
    );
};

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
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: appTheme.primary,
    },
    cartItems: {},
});
