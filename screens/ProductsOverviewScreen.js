import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProductItem } from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';

export const ProductOverviewScreen = (props) => {
    const allProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={allProducts}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    image={item.imageUrl}
                    onViewDetails={() => {
                        props.navigation.navigate('ProductDetail', {
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