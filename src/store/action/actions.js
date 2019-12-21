import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,
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