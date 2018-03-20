import axios from 'axios';
import * as ACTIONTYPES from './actionTypes';
import * as CONFIG from '../../utils/config';

const API_BASE_URL = CONFIG.API_BASE_URL;
const CLIENT_ID = CONFIG.CLIENT_ID;
const CLIENT_SECRET = CONFIG.CLIENT_SECRET;
const GRANT_TYPE = CONFIG.GRANT_TYPE;

const signUpStart = () => {
    return {
        type: ACTIONTYPES.SIGNUP_INIT,
    }
}

const signUpFailed = (error) => {
    return {
        type: ACTIONTYPES.SIGNUP_FAILED,
        error
    }
}

const signUpSuccess = () => {
    return {
        type: ACTIONTYPES.SIGNUP_SUCCESS
    }
}

export const signUp = (signUpObj) => {

    return (dispatch) => {
        dispatch(signUpStart());

        axios.post(`${API_BASE_URL}/api/profiles`, signUpObj)
            .then(response => {
                console.log(response);
                dispatch(signUpSuccess());
            }).catch(e => {
                console.log(e);
                dispatch(signUpFailed(e));
            })
    }
}

