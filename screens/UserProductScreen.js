import React from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ProductItem } from '../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { appTheme } from '../constants/colors';
import { deleteProduct } from '../store/actions/products';

export const UserProductScreen = ({ navigation }) => {
    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer() } />
                </HeaderButtons>
            )
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <FlatList
                data={userProduct}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductItem
                        image={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        onSelect={() => {}}
                    >
                        <Button color={appTheme.primary} title="Edit" onPress={() => {
                            
                        }}/>
                        <Button color={appTheme.primary} title="Delete" onPress={() => {
                           dispatch(deleteProduct(item.id));
                        }} />
                    </ProductItem>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {}
});