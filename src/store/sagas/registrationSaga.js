import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios'
import {
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_ERROR,
} from "../constants/actions-types";
import {baseUrl} from "./index";

export default function* watcherSaga() {
    yield takeEvery(POST_USER_REQUEST, workerSaga);
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
    console.log(data);
    yield  put({type: POST_USER_SUCCESS, payload: data});
}