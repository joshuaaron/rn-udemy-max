import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/actions';

export const NewPlaceScreen = (props) => {
    const [title, setTitle] = React.useState('');
    const dispatch = useDispatch();

    const changeHandler = (text) => {
        setTitle(text);
    };

    const savePlace = () => {
        dispatch(addPlace(title));
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
