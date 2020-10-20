import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
    ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/colors';
import { MapPreview } from './MapPreview';

export const LocationPicker = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const pickedLocation = route.params?.pickedLocation;
    useEffect(() => {
        if (pickedLocation) {
            setLocation(pickedLocation);
        }
    }, [pickedLocation]);

    const verifyPermissions = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant location permissions to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({});
            setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch {
            Alert.alert(
                'Could not fetch location',
                'Pleaase try again later or pick a location on the map',
                [{ text: 'Okay' }]
            );
        } finally {
            setIsFetching(false);
        }
    };

    const pickMapHandler = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.container}>
            <MapPreview
                styles={styles.mapPreview}
                location={location}
                onPress={pickMapHandler}
                navigation={navigation}
            >
                {isFetching ? <ActivityIndicator /> : <Text>No place</Text>}
            </MapPreview>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={getLocationHandler}
                    title='Get user location'
                    color={Colors.primary}
                />
                <Button
                    onPress={pickMapHandler}
                    title='Pick On Map'
                    color={Colors.primary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
