import { fork, all } from 'redux-saga/effects';
import * as axios from "axios";

import getUserSaga from "./getUserSaga";
import registrationSaga from "./registrationSaga";
import albumsSaga from "./albumsSaga";
import photosSaga from "./photosSaga";

export const baseUrl = 'http://192.168.1.133:5001/';

axios.default.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(getUserSaga),
        fork(registrationSaga),
        fork(albumsSaga),
        fork(photosSaga),
    ]);
}
