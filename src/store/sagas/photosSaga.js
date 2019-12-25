import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {PHOTO_FETCH_MODE, RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.GET_PHOTOS_REQUEST, fetchPhotos);
    yield takeEvery(ActionTypes.CREATE_PHOTO_REQUEST, createPhotos);

}


function* fetchPhotos(action) {
    try {
        let url;
        if (action.mode === PHOTO_FETCH_MODE.ALL) url = `${baseUrl}photos/`;
        else if (action.mode === PHOTO_FETCH_MODE.ALBUM) url = `${baseUrl}photos/`;
        const payload = yield call(axios.get, url);
        yield put({type: ActionTypes.GET_PHOTOS_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
    } catch (e) {
        yield put({type: ActionTypes.GET_PHOTOS_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}


function* createPhotos(action) {
    console.log('this is action form me',action.payload);
    try {
        let url = `${baseUrl}photos/`;
        const token = localStorage.getItem('key');
        const config = {
            method: 'POST',
            url,
            headers: token && { Authorization: `Token ${token}`},
            data: {
                name: action.payload.name,
                image: action.payload.image,
                album: action.payload.currentAlbum,
            }
        };

        const payload = yield call(axios, config);
        yield put({type: ActionTypes.CREATE_PHOTO_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({ type: ActionTypes.GET_PHOTOS_REQUEST, mode: PHOTO_FETCH_MODE.ALL});
    } catch (e) {
        yield put({type: ActionTypes.CREATE_PHOTO_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}