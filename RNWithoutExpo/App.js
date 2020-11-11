import React from 'react';
import { StyleSheet, View, StatusBar, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-picker';

const App = () => {
    const handlePress = () => {
        ImagePicker.launchCamera({}, (response) => {
            console.log('Response ', response);
        });
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Button onPress={handlePress} title="Open Image Picker" />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lighter,
    },
});

export default App;
