import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true, // tells OS show the alert both when the app is open as well as closed
        };
    },
});

export const HomeScreen = (props) => {
    const handleTrigger = () => {
        Notifications.scheduleNotificationAsync({
            trigger: {
                seconds: 5,
            },
            content: {
                title: 'Local Notification',
                body: 'This is a local notification',
            },
        });
    };

    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return Permissions.askAsync(Permissions.NOTIFICATIONS);
                }
                return statusObj;
            })
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return;
                }
            });
    }, []);

    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );

        const subscription = Notifications.addNotificationReceivedListener((listener) => {
            console.log(notification);
        });

        return () => {
            backgroundSubscription.remove();
            subscription.remove();
        };
    });

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title='Trigger Notification' onPress={handleTrigger} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
