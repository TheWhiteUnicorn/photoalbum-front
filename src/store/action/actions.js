import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,
    SAVE_USER_KEY,
    DELETE_USER_DATA_REQUEST,
    LOGIN_USER_REQUEST,
} from "../constants/actions-types";

export function getUser(data) {
    return {
        type: GET_USER_REQUEST,
        payload: data,
    }
}

export function postRegister(data) {
    return {
        type: POST_USER_REQUEST,
        payload: data,
    }
}

export function saveUserKey(data) {
    return {
        type: SAVE_USER_KEY,
        payload: data,
    }
}

export function deleteUserData(data) {
    return {
        type: DELETE_USER_DATA_REQUEST,
        payload: data,
    }
}

export function postLogin(data) {
    return {
        type: LOGIN_USER_REQUEST,
        payload: data,
    }
}