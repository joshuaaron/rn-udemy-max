import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { VARS } from '../env';

export const MapPreview = (props) => {
    let mapPreviewUrl = '';
    if (props.location) {
        mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${VARS.googleApiKey}`;
    }

    return (
        <TouchableOpacity
            style={{ ...styles.container, ...props.styles }}
            onPress={props.onPress}
        >
            {!mapPreviewUrl ? (
                props.children
            ) : (
                <Image source={{ uri: mapPreviewUrl }} style={styles.image} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
