import React, { useCallback, useLayoutEffect, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../store/actions/products';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE': {
            const { field, text, isValid } = action.payload;
            const updatedValues = {
                ...state.inputValues,
                [field]: text,
            }
            const updatedValidities = {
                ...state.inputValidities,
                [field]: isValid,
            }
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
    const id = route.params?.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === id));
    const dispatch = useDispatch();

    const [state, updater] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct?.title || '',
            imageUrl: editedProduct?.imageUrl || '',
            description: editedProduct?.description || '',
            price: ''
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

    const submitHandler = useCallback(() => {
        if (!state.formIsValid) {
            return;
        }

        if (editedProduct) {
            dispatch(updateProduct(id, title, description, imageUrl))
        }
        else {
            dispatch(createProduct(title, description, imageUrl, +price))
        } 
        navigation.goBack();
    }, [dispatch, id, title, description, imageUrl, price, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: id ? 'Edit Product' : 'Add Product',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item iconName={'ios-checkmark'} iconSize={28} onPress={submitHandler} />
                </HeaderButtons>
            )
        })
    }, [navigation, id, submitHandler])

    const textChangeHandler = (fieldName, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        updater({ type: 'UPDATE', payload: { field: fieldName, text, isValid }})
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput autoCapitalize='sentences' style={styles.input} value={title} onChangeText={textChangeHandler.bind(this, 'title')} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={textChangeHandler.bind(this, 'imageUrl')} />
                </View>
                {editedProduct ? null : (<View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput keyboardType={'decimal-pad'} style={styles.input} value={price} onChangeText={textChangeHandler.bind(this, 'price')} />
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={textChangeHandler.bind(this, 'description')} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {},
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});