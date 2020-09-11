import React from 'react';
import { View, FlatList, Alert, StyleSheet, Button, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ProductItem } from '../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { appTheme } from '../constants/colors';
import { deleteProduct } from '../store/actions/products';

export const UserProductScreen = ({ navigation }) => {
    const userProduct = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        navigation.navigate('Edit', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'This will delete this item', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(deleteProduct(id));
                },
            },
        ]);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-menu'} onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-create'} onPress={() => navigation.navigate('Edit')} />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    if (!userProduct.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No products found, maybe start creating some?</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={userProduct}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem
                        image={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        onSelect={() => {
                            editProductHandler(item.id);
                        }}
                    >
                        <Button
                            color={appTheme.primary}
                            title='Edit'
                            onPress={() => {
                                editProductHandler(item.id);
                            }}
                        />
                        <Button
                            color={appTheme.primary}
                            title='Delete'
                            onPress={deleteHandler.bind(this, item.id)}
                        />
                    </ProductItem>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
