import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/actions';
import { ImgPicker } from '../components/ImagePicker';
import { LocationPicker } from '../components/LocationPicker';

export const NewPlaceScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({});

    const dispatch = useDispatch();

    const changeHandler = (text) => setTitle(text);
    const handleImageTaken = (imgPath) => setImage(imgPath);

    const savePlace = () => {
        dispatch(addPlace(title, image, selectedLocation));
        navigation.goBack();
    };

    const locationPicked = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={changeHandler}
                    autoCorrect={false}
                />
                <ImgPicker onImageTaken={handleImageTaken} />
                <LocationPicker
                    navigation={navigation}
                    route={route}
                    onLocationPicked={locationPicked}
                />
                <Button
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlace}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        padding: 4,
    },
});
