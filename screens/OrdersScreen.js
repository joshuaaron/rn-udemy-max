import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FlatList } from 'react-native-gesture-handler';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { OrderItem } from '../components/shop/OrderItem';
import { fetchOrders } from '../store/actions/orders';
import { appTheme } from '../constants/colors';

export const OrdersScreen = ({ navigation }) => {
    const [status, setStatus] = React.useState('idle');
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStatus('idle');
        });

        return unsubscribe;
    }, [navigation, setStatus]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        const getOrders = async () => {
            setStatus('loading');
            try {
                await dispatch(fetchOrders());
                setStatus('complete');
            } catch (err) {
                setStatus('error');
            }
        };

        if (status === 'idle') {
            getOrders();
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={appTheme.primary} />
            </View>
        );
    }

    if (!orders.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No products found, maybe start creating some?</Text>
            </View>
        );
    }

    const renderOrder = ({ item }) => {
        return <OrderItem date={item.readableDate} amount={item.totalAmount} items={item.items} />;
    };
    return <FlatList data={orders} renderItem={renderOrder} style={styles.container} />;
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
