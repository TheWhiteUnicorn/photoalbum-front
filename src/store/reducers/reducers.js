import {combineReducers} from 'redux';
import getUserInfoReducer from './getUserReducer';

const allReducers = combineReducers({
    getUserInfoReducer,
});

export default allReducers;