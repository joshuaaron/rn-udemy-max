import React from 'react';
import { View, StyleSheet, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ProductItem } from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { appTheme } from '../constants/colors';
import { fetchProducts } from '../store/actions/products';

export const ProductOverviewScreen = ({ navigation }) => {
    const [status, setStatus] = React.useState('idle');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const allProducts = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = React.useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(fetchProducts());
            setStatus('complete');
        } catch (err) {
            setStatus('error');
        }
        setIsRefreshing(false);
    }, [dispatch]);

    // Only initial fetch
    React.useEffect(() => {
        if (status === 'idle') {
            setStatus('loading');
            loadProducts();
        }
    }, [status, loadProducts]);

    // Listen to screen changes to ensure we get the latest data always
    // Needed as this won't call on initial load.
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStatus('idle');
        });

        return unsubscribe;
    }, [navigation, setStatus]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-cart'} onPress={() => navigation.navigate('Cart')} />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title,
        });
    };

    if (status === 'error') {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>An error occured!</Text>
                <Button title='Try again' onPress={loadProducts} color={appTheme.primary} />
            </View>
        );
    }

    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={appTheme.primary} />
            </View>
        );
    }

    if (status === 'complete' && allProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={allProducts}
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    image={item.imageUrl}
                    onSelect={() => {
                        selectItemHandler(item.id, item.title);
                    }}
                >
                    <Button
                        color={appTheme.primary}
                        title='View Details'
                        onPress={() => {
                            selectItemHandler(item.id, item.title);
                        }}
                    />
                    <Button
                        color={appTheme.primary}
                        title='Add to Cart'
                        onPress={() => {
                            dispatch(cartActions.addToCart(item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginBottom: 20,
    },
});
