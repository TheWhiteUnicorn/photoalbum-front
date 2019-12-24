import {combineReducers} from 'redux';
import getUserInfoReducer from './getUserReducer';
import albums from './albums';
import photos from "./photos";

const allReducers = combineReducers({
    getUserInfoReducer,
    albums,
    photos,
});

export default allReducers;