import React from 'react';
import { Platform, AsyncStorage, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { appTheme } from '../constants/colors';
import { ProductOverviewScreen } from '../screens/ProductsOverviewScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { UserProductScreen } from '../screens/UserProductScreen';
import { EditProductScreen } from '../screens/EditProductScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { RESTORE_TOKEN, logout } from '../store/actions/auth';

const Auth = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

export const AppNavigation = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const restoreToken = async () => {
            let userData;
            try {
                const data = await AsyncStorage.getItem('userData');
                userData = JSON.parse(data);

                if (!userData) {
                    dispatch({
                        type: RESTORE_TOKEN,
                        payload: {
                            token: null,
                            userId: null,
                        },
                    });
                }
            } catch (err) {
                console.log(err.message);
            }
            const { token, userId, expiryDate } = userData;
            const finalExpiry = new Date(expiryDate);
            let hasExpired = finalExpiry <= new Date();

            dispatch({
                type: RESTORE_TOKEN,
                payload: {
                    token: hasExpired ? null : token,
                    userId: hasExpired ? null : userId,
                },
            });
        };

        restoreToken();
    }, []);

    if (auth.loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleLogout = (navigation) => {
        navigation.closeDrawer();
        dispatch(logout());
    };

    return (
        <NavigationContainer>
            {!auth.token ? (
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
                <Drawer.Navigator
                    drawerContent={(props) => {
                        return (
                            <DrawerContentScrollView {...props}>
                                <DrawerItemList {...props} />
                                <Button
                                    title='Logout'
                                    onPress={handleLogout.bind(null, props.navigation)}
                                    color={appTheme.primary}
                                />
                            </DrawerContentScrollView>
                        );
                    }}
                >
                    <Drawer.Screen
                        name='Home'
                        component={TabNavigator}
                        options={{
                            drawerIcon: (config) => (
                                <Ionicons
                                    size={23}
                                    color={config.tintColor}
                                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
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
                                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

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
