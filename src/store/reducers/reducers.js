import {combineReducers} from 'redux';
import getUserInfoReducer from './getUserReducer';
import albums from './albums';
import photos from "./photos";
import saveUserInfoReducer from './postRegistrReducer';

const allReducers = combineReducers({
    getUserInfoReducer,
    albums,
    photos,
    saveUserInfoReducer,
});

export default allReducers;