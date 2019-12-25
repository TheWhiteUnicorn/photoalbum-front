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
                currentAlbum: Math.min(Math.max(state.currentAlbum, 0), action.payload.data.length),
            };
        case ActionTypes.SET_CURRENT_ALBUM:
            return {
                ...state,
                currentAlbum: action.albumId,
            };
        default: return state;
    }
};

export default albums;