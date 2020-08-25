import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { store } from './store';
import { appTheme } from './constants/colors';
import { ProductOverviewScreen } from './screens/ProductsOverviewScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { UserProductScreen } from './screens/UserProductScreen';
import { EditProductScreen } from './screens/EditProductScreen';
import { AuthScreen } from './screens/AuthScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

const Auth = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

export default function App() {
    const [token, setToken] = useState(null);
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                {!token ? (
                    <Auth.Navigator>
                        <Auth.Screen
                            component={AuthScreen}
                            name={'Auth'}
                            options={{
                                headerTitle: 'Authenticate',
                            }}
                        />
                    </Auth.Navigator>
                ) : (
                    <Drawer.Navigator>
                        <Drawer.Screen
                            name='Home'
                            component={TabNavigator}
                            options={{
                                drawerIcon: (config) => (
                                    <Ionicons
                                        size={23}
                                        color={config.tintColor}
                                        name={
                                            Platform.OS === 'android' ? 'md-create' : 'ios-create'
                                        }
                                    />
                                ),
                            }}
                        />
                        <Drawer.Screen
                            name='Orders'
                            component={OrdersNavigator}
                            options={{
                                drawerIcon: (config) => (
                                    <Ionicons
                                        size={23}
                                        color={config.tintColor}
                                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                    />
                                ),
                            }}
                        />
                        <Drawer.Screen
                            name='Admin'
                            component={AdminNavigator}
                            options={{
                                drawerIcon: (config) => (
                                    <Ionicons
                                        size={23}
                                        color={config.tintColor}
                                        name={
                                            Platform.OS === 'android' ? 'md-create' : 'ios-create'
                                        }
                                    />
                                ),
                            }}
                        />
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </Provider>
    );
}

const AdminNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='User Products' component={UserProductScreen} />
        <Stack.Screen name='Edit' component={EditProductScreen} />
    </Stack.Navigator>
);

const OrdersNavigator = () => (
    <Stack.Navigator initialRouteName='Order'>
        <Stack.Screen name='Your Orders' component={OrdersScreen} />
    </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='All Products' component={BaseStackNavigator} />
    </Tab.Navigator>
);

const BaseStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? appTheme.primary : 'white',
                },
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold',
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : appTheme.primary,
            }}
        >
            <Stack.Screen name='All Products' component={ProductOverviewScreen} />
            <Stack.Screen
                name='ProductDetail'
                component={ProductDetailScreen}
                options={({ route }) => ({ title: route.params.productTitle })}
            />
            <Stack.Screen name='Cart' component={CartScreen} />
        </Stack.Navigator>
    );
};
