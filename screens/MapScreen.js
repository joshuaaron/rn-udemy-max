import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/colors';

export const MapScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
    };

    const handleSave = useCallback(() => {
        if (!location) {
            return;
        }

        navigation.navigate('NewPlace', {
            pickedLocation: location,
        });
    }, [navigation, location]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleSave}
                >
                    <Text style={styles.headerText}>Save</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, handleSave]);

    let markerCoordinates;
    if (location) {
        markerCoordinates = {
            latitude: location.latitude,
            longitude: location.longitude,
        };
    }
    return (
        <MapView region={mapRegion} style={styles.map} onPress={selectLocation}>
            {markerCoordinates ? (
                <Marker
                    title='Picked Location'
                    coordinate={markerCoordinates}
                ></Marker>
            ) : null}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButton: {
        marginHorizontal: 20,
    },
    headerText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
});
