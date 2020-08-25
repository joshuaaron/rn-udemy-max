import React, { useReducer, useState } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Input } from '../components/UI/Input';
import { Card } from '../components/UI/Card';
import { appTheme } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { signUp, login } from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE': {
            const { field, text, isValid } = action.payload;
            const updatedValues = {
                ...state.inputValues,
                [field]: text,
            };
            const updatedValidities = {
                ...state.inputValidities,
                [field]: isValid,
            };

            let formIsValid = true;
            for (const key in updatedValidities) {
                formIsValid = formIsValid && updatedValidities[key];
            }

            return {
                formIsValid,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
            };
        }
        default:
            return state;
    }
};

export const AuthScreen = (props) => {
    const [isSignup, setIsSignup] = useState(false);
    const [status, setStatus] = useState('idle');
    const [errorText, setErrorText] = useState('');
    const [state, updater] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    const dispatch = useDispatch();

    const textChangeHandler = (fieldName, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        updater({ type: 'UPDATE', payload: { field: fieldName, text, isValid } });
    };

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = signUp(state.inputValues.email, state.inputValues.password);
        } else {
            action = login(state.inputValues.email, state.inputValues.password);
        }

        try {
            setStatus('loading');
            await dispatch(action);
        } catch (err) {
            setErrorText(err.message);
            setStatus('error');
        }
    };

    const handleSwitchViews = () => {
        setStatus('idle');
        setIsSignup((prev) => !prev);
    };

    React.useEffect(() => {
        if (status === 'error') {
            Alert.alert('An Error Occured', errorText, [{ text: 'Okay' }]);
        }
    }, [status]);

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='padding' keyboardVerticalOffset={50}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView style={styles.container}>
                        <Text>{status}</Text>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMessage='Please enter a valid email address.'
                            onChangeText={textChangeHandler.bind(this, 'email')}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorMessage='Please enter a valid password.'
                            onChangeText={textChangeHandler.bind(this, 'password')}
                            initialValue=''
                        />
                        {status === 'loading' ? (
                            <ActivityIndicator size='small' color={appTheme.primary} />
                        ) : (
                            <Button
                                title={isSignup ? 'Sign up' : 'Login'}
                                color={appTheme.primary}
                                onPress={authHandler}
                            />
                        )}
                        <Button
                            title={`Switch to ${isSignup ? 'Login' : 'Sign up'}`}
                            color={appTheme.primary}
                            onPress={handleSwitchViews}
                        />
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    authContainer: {
        width: '100%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
});
