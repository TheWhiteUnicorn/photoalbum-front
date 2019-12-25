import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.GET_ALBUMS_REQUEST, fetchAlbums);
    yield takeEvery(ActionTypes.CREATE_ALBUM_REQUEST, createAlbum);

}


function* fetchAlbums() {
    try {
        const url = `${baseUrl}albums/`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'GET',
            headers: token && { Authorization: `Token ${token}`},
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.GET_ALBUMS_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
    } catch (e) {
        yield put({type: ActionTypes.GET_ALBUMS_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}

function* createAlbum(action) {
    try {
        const url = `${baseUrl}albums/`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'POST',
            headers: { Authorization: `Token ${token}`},
            data: {
                name: action.payload,
            }
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.CREATE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({type: ActionTypes.GET_ALBUMS_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
    } catch (e) {
        yield put({type: ActionTypes.CREATE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}
