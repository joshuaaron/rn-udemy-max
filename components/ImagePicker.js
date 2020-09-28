import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import { Colors } from '../constants/colors';

export const ImgPicker = (props) => {
    const [pickedImage, setPickedImage] = useState('');

    const getPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant camera permissions to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        if (await getPermissions()) {
            const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5, // 0 => 1.
            });

            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No Image picked yet</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
            </View>
            <Button
                onPress={takeImageHandler}
                title='Take Image'
                color={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
