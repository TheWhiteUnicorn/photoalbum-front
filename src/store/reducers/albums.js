import * as ActionTypes from "../constants/actions-types";

const initialState = {
    albums: null,
    currentAlbum: null,
};


const albums = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALBUMS_RESPONSE:
            return {
                ...state,
                albums: action.payload.data,
                currentAlbum: null,
            };
        default: return state;
    }
};

export default albums;