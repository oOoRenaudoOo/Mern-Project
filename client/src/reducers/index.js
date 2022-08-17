import { combineReducers } from 'redux';
import userReducer from './user.reducer';



//combineReducers() regroupe plusieurs actions sur les donnees
export default combineReducers({
    userReducer,
})
