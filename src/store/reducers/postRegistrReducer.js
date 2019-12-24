import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,
    SAVE_USER_KEY,
    DELETE_USER_DATA_RESPONSE,
    LOGIN_USER_SUCCESS,
} from "../constants/actions-types";

const initialState = {
    key: null,
    error: null,
};


const saveUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_USER_SUCCESS:
            return {
                ...state,
                key: action.payload.key,
            };
        case POST_USER_ERROR:
            return {
                error: 'Not Found'
            };
        case SAVE_USER_KEY:
            return {
                ...state,
                key: action.payload,
            };
        case DELETE_USER_DATA_RESPONSE:
            return {
                ...state,
                key: null,
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                key: action.payload.key,
            };

        default: return state;
    }
};

export default saveUserInfoReducer;

