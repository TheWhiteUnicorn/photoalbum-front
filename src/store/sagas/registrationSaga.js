import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios'
import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, GET_USER_SUCCESS, GET_USER_REQUEST,
} from "../constants/actions-types";
import {baseUrl} from "./index";

export default function* watcherSaga() {
    yield takeEvery(POST_USER_REQUEST, workerSaga);
    yield takeEvery(LOGIN_USER_REQUEST, loginSaga);
}

function* workerSaga(action) {
    console.log(action.payload);
    const config = {
        method: 'POST',
        url: `${baseUrl}rest-auth/registration/`,
        data: {
            username: action.payload.username,
            password1: action.payload.pass1,
            password2: action.payload.pass2,
        }
    };
    const {data} = yield call(axios, config);
    console.log(data, 9876564321);
    localStorage.setItem('key', data.key);
    yield  put({type: POST_USER_SUCCESS, payload: data});
}

function* loginSaga(action) {
    const config = {
        method: 'POST',
        url: `${baseUrl}rest-auth/login/`,
        data: {
            username: action.payload.username,
            password: action.payload.pass1,
        }
    };
    const { data } = yield call(axios, config);
    localStorage.setItem('key', data.key);
    yield  put({type: LOGIN_USER_SUCCESS, payload: data});
    yield  put({type: GET_USER_REQUEST, payload: data.key});
}
