import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

export const ProductOverviewScreen = (props) => {
    const allProducts = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={allProducts}
            renderItem={itemData => (
                <Text key={itemData.item.id}>{itemData.item.title}</Text>
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