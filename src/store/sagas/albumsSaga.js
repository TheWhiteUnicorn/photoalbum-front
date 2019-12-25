import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.GET_ALBUMS_REQUEST, fetchAlbums);
}


function* fetchAlbums() {
    try {
        const url = `${baseUrl}albums/`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'GET',
            headers: { Authorization: `Token ${token}`},
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.GET_ALBUMS_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
    } catch (e) {
        yield put({type: ActionTypes.GET_ALBUMS_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}