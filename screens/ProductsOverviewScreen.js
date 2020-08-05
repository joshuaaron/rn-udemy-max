import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ProductItem } from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { appTheme } from '../constants/colors';

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
    }, [navigation]);

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }

    return (
        <FlatList
            data={allProducts} 
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    image={item.imageUrl}
                    onSelect={() => {
                        selectItemHandler(item.id, item.title);
                    }}
                >
                    <Button color={appTheme.primary} title="View Details" onPress={() => {
                        selectItemHandler(item.id, item.title);
                    }}/>
                    <Button color={appTheme.primary} title="Add to Cart" onPress={() => {
                        dispatch(cartActions.addToCart(item))
                    }} />
                </ProductItem>
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