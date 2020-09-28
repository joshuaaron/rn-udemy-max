import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop(); // returns the last string for the filename from the path.
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image, // temporary directory where the file currently sits
                to: newPath,
            });
        } catch (err) {
            console.log(err);
        }

        dispatch({
            type: ADD_PLACE,
            payload: { title, newPath },
        });
    };
};
