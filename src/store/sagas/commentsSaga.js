import axios from 'axios/index';
import { takeEvery, call, put } from "redux-saga/effects";

import {baseUrl} from "./index";
import * as ActionTypes from "../constants/actions-types";
import {PHOTO_FETCH_MODE, RESPONSE_STATUSES} from "../constants/networking";


export default function* watcherSaga() {
    yield takeEvery(ActionTypes.CREATE_COMMENT_REQUEST, createComment);
}


function* createComment(action) {
    try {
        const url = `${baseUrl}comments/`;
        const token = localStorage.getItem('key');
        const config = {
            url,
            method: 'POST',
            headers: token && { Authorization: `Token ${token}`},
            data: {
                text: action.text,
                photo: action.photoId,
            }
        };
        const payload = yield call(axios, config);
        yield put({type: ActionTypes.CREATE_COMMENT_RESPONSE, status: RESPONSE_STATUSES.SUCCESS, payload});
        yield put({type: ActionTypes.GET_PHOTOS_REQUEST, mode: PHOTO_FETCH_MODE.ALL})
    } catch (e) {
        yield put({type: ActionTypes.CREATE_COMMENT_RESPONSE, status: RESPONSE_STATUSES.FAIL, message: e.message});
    }
}