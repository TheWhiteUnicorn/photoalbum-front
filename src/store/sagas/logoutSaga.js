import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios';
import {
    DELETE_USER_DATA_REQUEST,
    DELETE_USER_DATA_RESPONSE,
} from "../constants/actions-types";

import { baseUrl } from "./index";

export default function* watcherSaga() {
    yield takeEvery(DELETE_USER_DATA_REQUEST, workerSaga);
}

function* workerSaga(action) {
    const config = {
        method: 'POST',
        url: `${baseUrl}rest-auth/logout/`,
        headers: { Authorization: `Token ${action.payload}`},
    };
    const { data } = yield call(axios, config);
    localStorage.setItem('key', null);
    yield  put({type: DELETE_USER_DATA_RESPONSE, payload: data});
}