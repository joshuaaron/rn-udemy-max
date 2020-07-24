import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ProductItem } from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import { CustomHeaderButton } from '../components/UI/HeaderButton';

export const ProductOverviewScreen = ({ navigation }) => {
    const allProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-cart'} onPress={() => navigation.navigate('Cart')} />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer() } />
                </HeaderButtons>
            )
        })
    }, [navigation])

    return (
        <FlatList
            data={allProducts}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    image={item.imageUrl}
                    onViewDetails={() => {
                        navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title
                        })
                    }}
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(item))
                    }}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});