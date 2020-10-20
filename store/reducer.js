import { ADD_PLACE, SET_PLACES } from './actions';
import { Place } from '../models/place';

const initialState = {
    places: [],
};

export const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            const newPlace = new Place(
                action.payload.id.toString(),
                action.payload.title,
                action.payload.image
            );
            return {
                places: [...state.places, newPlace],
            };
        }
        case SET_PLACES: {
            return {
                places: action.payload.map(
                    (place) => new Place(place.id.toString(), place.title, place.imageUri)
                ),
            };
        }
        default: {
            return state;
        }
    }
};
