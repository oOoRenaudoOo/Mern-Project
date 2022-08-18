import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';


//combineReducers() regroupe plusieurs actions sur les donnees
export default combineReducers({
    userReducer,
    usersReducer
})
