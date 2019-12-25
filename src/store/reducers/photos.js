import * as ActionTypes from "../constants/actions-types";

const initialState = {
    photos: null,
    currentPhoto: null,
};


const photos = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_PHOTOS_RESPONSE:
            return {
                ...state,
                photos: action.payload.data,
            };
        case ActionTypes.SET_CURRENT_PHOTO:
            return {
                ...state,
                currentPhoto: action.photoId,
            };
        default: return state;
    }
};

export default photos;