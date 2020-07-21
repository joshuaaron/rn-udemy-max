import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { appTheme } from '../../constants/colors';

export const CustomHeaderButton = (props) => {
    const color = Platform.OS === 'android' ? 'white' : appTheme.primary;
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={24} color={color} style={styles.container} />
    );
}

const styles = StyleSheet.create({
    container: {}
});