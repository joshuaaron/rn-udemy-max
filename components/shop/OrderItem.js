import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CartItem } from './CartItem';
import { appTheme } from '../../constants/colors';

export const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const text = showDetails ? 'Hide Details' : 'Show Details';
    const handleShowDetails = () => {
        setShowDetails(s => !s);
    };

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={appTheme.primary} onPress={handleShowDetails} title={text} />
            {showDetails && (
                <View style={styles.details}>
                    {props.items.map(item => (
                        <CartItem
                            key={item.title}
                            quantity={item.quantity}
                            title={item.title}
                            amount={item.sum}
                            deletable={false}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    details: {
        width: '100%'
    }
});