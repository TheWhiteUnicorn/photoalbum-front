import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios'
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from "../constants/actions-types";

export default function* watcherSaga() {
    yield takeEvery(GET_USER_REQUEST, workerSaga);
}

function* workerSaga(action) {
    try {
        console.log(action.payload);
        const { data } = yield call(axios, 'https://c31a5cbc.ngrok.io/rest-auth/user/', {
            method: 'get',
        });
        yield  put({ type: GET_USER_SUCCESS, payload: data });
    } catch (e) {
        yield put({ type: GET_USER_ERROR, payload: e });
    }
}
