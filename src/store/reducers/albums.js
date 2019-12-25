import * as ActionTypes from "../constants/actions-types";
import {RESPONSE_STATUSES} from "../constants/networking";

const initialState = {
    albums: null,
    currentAlbum: null,
};


const albums = (state = initialState, action) => {
    if (action.status === RESPONSE_STATUSES.SUCCESS)
        switch (action.type) {
            case ActionTypes.GET_ALBUMS_RESPONSE:
                return {
                    ...state,
                    albums: action.payload.data,
                };
            case ActionTypes.SET_CURRENT_ALBUM:
                return {
                    ...state,
                    currentAlbum: action.albumId,
                };
            default: return state;
        }
    else
        return state
};

export default albums;