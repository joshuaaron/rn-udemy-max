import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FlatList } from 'react-native-gesture-handler';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { OrderItem } from '../components/shop/OrderItem';

export const OrdersScreen = ({ navigation }) => {
    const orders = useSelector(state => state.orders.orders);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer() } />
                </HeaderButtons>
            )
        })
    }, [navigation])

    const renderOrder = ({ item }) => {
        return (
            <OrderItem
                date={item.readableDate}
                amount={item.totalAmount}
                items={item.items}
            />
        )
    }
    return (
        <FlatList
            data={orders}
            renderItem={renderOrder}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {}
});