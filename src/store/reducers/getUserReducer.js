import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from "../constants/actions-types";

const initialState = {
    userInfo: null,
    error: null,
};


const getUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
            };
        case GET_USER_ERROR:
            return {
                error: 'Not Found'
            };

        default: return state;
    }
};

export default getUserInfoReducer;

