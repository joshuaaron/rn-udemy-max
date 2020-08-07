import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export const Input = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});