import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ProductOverviewScreen } from './screens/ProductsOverviewScreen';
import { store } from './store';
import { appTheme } from './constants/colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();


export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={TabNavigator} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const TabNavigator = () => (
    <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen
            name='All Products'
            component={BaseStackNavigator}
        />
    </Tab.Navigator>
)
const BaseStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? appTheme.primary : 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : appTheme.primary,
        }}>
            <Stack.Screen
                name='All Products'
                component={ProductOverviewScreen}
            />
        </Stack.Navigator>
    )
}

