import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { PlaceItem } from '../components/PlaceItem';
import { loadPlaces } from '../store/actions';

export const PlacesListScreen = ({ navigation }) => {
    const places = useSelector((state) => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces());
    }, [dispatch]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // title: 'All Places',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title={'Add Place'}
                        iconName={'ios-add'}
                        onPress={() => {
                            navigation.navigate('NewPlace');
                        }}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PlaceItem
                        image={item.imageUri}
                        title={item.title}
                        address={null}
                        onSelect={() => {
                            navigation.navigate('PlaceDetail', {
                                title: item.title,
                                id: item.id,
                            });
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
