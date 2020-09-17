import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Colors } from '../constants/colors';

export const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={24}
            color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
