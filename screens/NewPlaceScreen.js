import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/actions';
import { ImgPicker } from '../components/ImagePicker';

export const NewPlaceScreen = (props) => {
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');

    const dispatch = useDispatch();

    const changeHandler = (text) => setTitle(text);
    const handleImageTaken = (imgPath) => setImage(imgPath);

    const savePlace = () => {
        dispatch(addPlace(title, image));
        props.navigation.goBack();
    };

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
                <Button title='Save Place' color={Colors.primary} onPress={savePlace} />
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
