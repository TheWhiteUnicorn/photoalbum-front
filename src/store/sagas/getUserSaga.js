import { takeEvery, call, put } from "redux-saga/effects";
import axios from 'axios'
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from "../constants/actions-types";
import {baseUrl} from "./index";

export default function* watcherSaga() {
    yield takeEvery(GET_USER_REQUEST, workerSaga);
}

function* workerSaga(action) {
    try {
        console.log(action.payload);
        const { data } = yield call(axios,  {
            url: `${baseUrl}rest-auth/user/`,
            method: 'get',
            headers: { Authorization: `Token ${action.payload}` },
        });
        yield  put({ type: GET_USER_SUCCESS, payload: data });
    } catch (e) {
        yield put({ type: GET_USER_ERROR, payload: e });
    }
}
