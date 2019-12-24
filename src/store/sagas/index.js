import { fork, all } from 'redux-saga/effects';
import getUserSaga from "./getUserSaga";
import registrationSaga from "./registrationSaga";
import logoutSaga from "./logoutSaga";

import * as axios from "axios";


export const baseUrl = 'http://192.168.1.133:5001/';

axios.default.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(getUserSaga),
        fork(registrationSaga),
        fork(logoutSaga),
    ]);
}
