import React, { useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HomeScreen } from './screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen
                    name='Home'
                    component={BaseStackNavigator}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const BaseStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}

