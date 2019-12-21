import { fork, all } from 'redux-saga/effects';
import getUserSaga from "./getUserSaga";
import registrationSaga from "./registrationSaga";

export default function* rootSaga() {
    yield all([
        fork(getUserSaga),
        fork(registrationSaga),
    ]);
}
