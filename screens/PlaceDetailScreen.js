import React from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlace } from '../store/actions';

export const PlaceDetailScreen = ({ navigation, route }) => {
    const { id } = route.params;

    const dispatch = useDispatch();
    const selectedPlace = useSelector((state) =>
        state.places.places.find((place) => place.id === id)
    );

    const handleDelete = () => {
        dispatch(deletePlace(id));

        navigation.goBack();
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedPlace?.title || '',
        });
    }, [navigation, selectedPlace]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: 'center' }}
        >
            <Image
                style={styles.image}
                source={{ uri: selectedPlace.imageUri }}
            />
            <View style={styles.address}>
                <Text style={styles.text}>
                    Lat: {selectedPlace.lat.toFixed(2)} | Lng:{' '}
                    {selectedPlace.lng.toFixed(2)}
                </Text>
            </View>
            <Button onPress={handleDelete} title='Delete Place' />
        </ScrollView>
    );
    <Image />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 30,
        flex: 1,
    },
    address: {
        flex: 1,
        marginBottom: 50,
    },
});
