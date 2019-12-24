import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {PHOTO_FETCH_MODE, RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.GET_PHOTOS_REQUEST, fetchPhotos);
}


function* fetchPhotos(action) {
    try {
        let url;
        if (action.mode === PHOTO_FETCH_MODE.ALL) url = `${baseUrl}photos/`;
        const payload = yield call(axios.get, url);
        yield put({type: ActionTypes.GET_PHOTOS_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
    } catch (e) {
        yield put({type: ActionTypes.GET_PHOTOS_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}