import * as ActionTypes from "../constants/actions-types";
import {RESPONSE_STATUSES} from "../constants/networking";

const initialState = {
    albums: null,
    currentAlbum: null,
};


const albums = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALBUMS_RESPONSE:
            if (action.status === RESPONSE_STATUSES.SUCCESS) {
                return {
                    ...state,
                    albums: action.payload.data,
                }
            } else return state;
        case ActionTypes.SET_CURRENT_ALBUM:
            return {
                ...state,
                currentAlbum: action.albumId,
            };
        default: return state;
    }
};

export default albums;