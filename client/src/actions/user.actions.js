import axios from 'axios';

export const GET_USER = "GET_USER";


export const getUser = (uid) => {
    // envoyer donnes dans reducer qui l'envoie dans store
    return (dispatch) => {
        return axios
            .get(`${ process.env.REACT_APP_API_URL }api/user/${ uid }`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })     
            })
            .catch((err) => console.log(err));
    }
}