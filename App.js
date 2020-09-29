import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { PlacesListScreen } from './screens/PlacesListScreen';
import { PlaceDetailScreen } from './screens/PlaceDetailScreen';
import { MapScreen } from './screens/MapScreen';
import { NewPlaceScreen } from './screens/NewPlaceScreen';
import { Colors } from './constants/colors';
import { placesReducer } from './store/reducer';
import { init } from './helpers/db';

const rootReducer = combineReducers({
    places: placesReducer,
});

init()
    .then(() => {
        console.log('Initialized Database');
    })
    .catch((err) => {
        console.log('Initializing db failed ', err);
    });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();
const Tab =
    Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialBottomTabNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='Home'>
                    <Tab.Screen name='Home' component={BaseStackNavigator} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const BaseStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
            }}
        >
            <Stack.Screen name='Places' component={PlacesListScreen} />
            <Stack.Screen name='PlaceDetail' component={PlaceDetailScreen} />
            <Stack.Screen
                name='NewPlace'
                options={{ title: 'Add Place' }}
                component={NewPlaceScreen}
            />
            <Stack.Screen name='Map' component={MapScreen} />
        </Stack.Navigator>
    );
};
