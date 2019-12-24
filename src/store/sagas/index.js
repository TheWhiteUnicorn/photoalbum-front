import { fork, all } from 'redux-saga/effects';
import getUserSaga from "./getUserSaga";
import registrationSaga from "./registrationSaga";
import * as axios from "axios";

export const baseUrl = 'http://127.0.0.1:5000/';

axios.default.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(getUserSaga),
        fork(registrationSaga),
    ]);
}
