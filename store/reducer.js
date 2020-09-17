import { ADD_PLACE } from './actions';
import { Place } from '../models/place';

const initialState = {
    places: [],
};

export const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            const newPlace = new Place(new Date().toString(), action.payload);
            return {
                places: [...state.places, newPlace],
            };
        }
        default: {
            return state;
        }
    }
};
