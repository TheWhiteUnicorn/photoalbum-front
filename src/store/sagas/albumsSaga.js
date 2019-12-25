import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.GET_ALBUMS_REQUEST, fetchAlbums);
    yield takeEvery(ActionTypes.CREATE_ALBUM_REQUEST, createAlbum);
    yield takeEvery(ActionTypes.DELETE_ALBUM_REQUEST, deleteAlbum);
    yield takeEvery(ActionTypes.EDIT_ALBUM_REQUEST, editAlbum);
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
            headers: token && { Authorization: `Token ${token}`},
            data: {
                name: action.payload,
            }
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.CREATE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({type: ActionTypes.GET_ALBUMS_REQUEST});
    } catch (e) {
        yield put({type: ActionTypes.CREATE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}

function* deleteAlbum(action) {
    console.log(action);

    try {
        const url = `${baseUrl}albums/${action.payload}`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'DELETE',
            headers: token && { Authorization: `Token ${token}`},
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.DELETE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({type: ActionTypes.GET_ALBUMS_REQUEST});
    } catch (e) {
        yield put({type: ActionTypes.DELETE_ALBUM_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}


function* editAlbum(action) {
    console.log(action);

    try {
        const url = `${baseUrl}albums/${action.payload.id}`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'UPDATE',
            headers: token && { Authorization: `Token ${token}`},
            data: {
                name: action.payload.name,
                password: action.payload.pass1,
            }
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.EDIT_ALBUM_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({type: ActionTypes.GET_ALBUMS_REQUEST});
    } catch (e) {
        yield put({type: ActionTypes.EDIT_ALBUM_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}

