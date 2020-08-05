import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Platform, TouchableNativeFeedback } from 'react-native';
import { Card } from '../UI/Card';

export const ProductItem = (props) => {
    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <Touchable onPress={props.onSelect} activeOpacity={0.8} useForeground>
            <Card style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
            </Card>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: 20,
    },
    imageWrapper: {
        overflow: 'hidden',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: { 
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        // marginVertical: 4,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 15
    }
});