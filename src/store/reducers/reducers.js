import {combineReducers} from 'redux';
import getUserInfoReducer from './getUserReducer';
import saveUserInfoReducer from './postRegistrReducer';

const allReducers = combineReducers({
    getUserInfoReducer,
    saveUserInfoReducer,
});

export default allReducers;