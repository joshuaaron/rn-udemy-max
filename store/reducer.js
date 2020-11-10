import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from './actions';
import { Place } from '../models/place';

const initialState = {
    places: [],
};

export const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            const { id, title, image, lat, lng } = action.payload;
            const newPlace = new Place(id.toString(), title, image, lat, lng);
            return {
                places: [...state.places, newPlace],
            };
        }
        case SET_PLACES: {
            return {
                places: action.payload.map(
                    (place) =>
                        new Place(
                            place.id.toString(),
                            place.title,
                            place.imageUri,
                            place.lat,
                            place.lng
                        )
                ),
            };
        }
        case DELETE_PLACE: {
            const updated = state.places.filter(
                (place) => place.id !== action.payload
            );
            return {
                places: updated,
            };
        }
        default: {
            return state;
        }
    }
};
