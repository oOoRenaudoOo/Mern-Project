import { GET_USER } from "../actions/user.actions";

const initialState = {};

//Reducer traite suivant l'action les donnees dans store 

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload; 
        default:
            return state;   
    }
}