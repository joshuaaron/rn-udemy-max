import React, { useCallback, useLayoutEffect, useReducer } from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../store/actions/products';
import { Input } from '../components/UI/Input';
import { appTheme } from '../constants/colors';

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

export const EditProductScreen = ({ navigation, route }) => {
    const [status, setStatus] = React.useState('idle');
    const id = route.params?.productId;
    const editedProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === id)
    );
    const dispatch = useDispatch();

    const [state, updater] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct?.title || '',
            imageUrl: editedProduct?.imageUrl || '',
            description: editedProduct?.description || '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    });

    const { title, imageUrl, price, description } = state.inputValues;

    const submitHandler = useCallback(async () => {
        if (!state.formIsValid) {
            return;
        }
        setStatus('loading');

        try {
            if (editedProduct) {
                await dispatch(updateProduct(id, title, description, imageUrl));
            } else {
                await dispatch(createProduct(title, description, imageUrl, +price));
            }
            setStatus('idle');
            navigation.goBack();
        } catch (err) {
            setStatus('error');
        }
    }, [dispatch, id, title, description, imageUrl, price, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: id ? 'Edit Product' : 'Add Product',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-checkmark'} iconSize={28} onPress={submitHandler} />
                </HeaderButtons>
            ),
        });
    }, [navigation, id, submitHandler]);

    React.useEffect(() => {
        if (status === 'error') {
            Alert.alert('An error occured', 'Something went wrong', [{ text: 'Okay' }]);
        }
    }, [status]);

    const textChangeHandler = (fieldName, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        updater({ type: 'UPDATE', payload: { field: fieldName, text, isValid } });
    };

    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={appTheme.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior='padding' style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <Input
                        value={title}
                        label={'Title'}
                        autoCapitalize='sentences'
                        onChangeText={textChangeHandler.bind(this, 'title')}
                    />
                    <Input
                        value={imageUrl}
                        label={'Image URL'}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                    {editedProduct ? null : (
                        <Input
                            value={price}
                            label={'Price'}
                            onChangeText={textChangeHandler.bind(this, 'price')}
                        />
                    )}
                    <Input
                        value={description}
                        label={'Description'}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        numberOfLines={3}
                        autoCapitalize='sentences'
                        multiline
                        autoCorrect
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        margin: 20,
    },
});
