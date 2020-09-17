import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { PlaceItem } from '../components/PlaceItem';

export const PlacesListScreen = ({ navigation }) => {
    const places = useSelector((state) => state.places.places);

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
                renderItem={({ item }) => <PlaceItem />}
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
