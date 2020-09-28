import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PlaceDetailScreen = ({ navigation, route }) => {
    const { title, id } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title,
        });
    }, [navigation, title]);
    return (
        <View style={styles.container}>
            <Text>Hi</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
