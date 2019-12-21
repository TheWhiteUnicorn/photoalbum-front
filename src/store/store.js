import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from "./reducers/reducers";
import rootSaga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    allReducers,composeEnhancers(applyMiddleware(sagaMiddleware)));

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;