import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePlace } from '../store/actions';

export const PlaceDetailScreen = ({ navigation, route }) => {
    const { title, id } = route.params;
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePlace(id));
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title,
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <Text>Hi</Text>
            <Button onPress={handleDelete} title='Delete Place' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
