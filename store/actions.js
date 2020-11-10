import * as FileSystem from 'expo-file-system';
import { VARS } from '../env';
import { insertPlace, fetchPlaces, deletePlaceById } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_PLACE = 'DELETE_PACE';

export const addPlace = (title, image, location) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop(); // returns the last string for the filename from the path.
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image, // temporary directory where the file currently sits
                to: newPath,
            });

            const dbResult = await insertPlace(
                title,
                newPath,
                'Dummy add',
                location.latitude,
                location.longitude
            );

            dispatch({
                type: ADD_PLACE,
                payload: {
                    title,
                    newPath,
                    id: dbResult.insertId,
                    lat: location.latitude,
                    lng: location.longitude,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const result = await fetchPlaces();
            dispatch({ type: SET_PLACES, payload: result.rows._array });
        } catch (err) {
            throw err;
        }
    };
};

export const deletePlace = (id) => {
    return async (dispatch) => {
        try {
            await deletePlaceById(id);
            dispatch({ type: DELETE_PLACE, payload: id });
        } catch (err) {
            throw err;
        }
    };
};
