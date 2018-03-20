import axios from 'axios';
import * as ACTIONTYPES from './actionTypes';
import * as CONFIG from '../../utils/config';

const API_BASE_URL = CONFIG.API_BASE_URL;
const CLIENT_ID = CONFIG.CLIENT_ID;
const CLIENT_SECRET = CONFIG.CLIENT_SECRET;
const GRANT_TYPE = CONFIG.GRANT_TYPE;

const authStart = () => {
    return {
        type: ACTIONTYPES.AUTH_INIT,
    }
}

const authFailed = (error) => {
    return {
        type: ACTIONTYPES.AUTH_FAILED,
        error
    }
}

const authSuccess = (accessToken, userId) => {
    return {
        type: ACTIONTYPES.AUTH_SUCCESS,
        accessToken,
        userId
    }
}

export const authenticate = (username, password, client_id = CLIENT_ID, client_secret = CLIENT_SECRET, grant_type = GRANT_TYPE) => {

    return (dispatch) => {
        dispatch(authStart());

        let searchParams = new URLSearchParams();
        searchParams.set('username', username);
        searchParams.set('password', password);
        searchParams.set('grant_type', grant_type);
        searchParams.set('client_id', client_id);
        searchParams.set('client_secret', client_secret);

        axios.post(`${API_BASE_URL}/api/login`, searchParams)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.accessToken, response.data.user.loginId));
            }).catch(e => {
                console.log(e);
                dispatch(authFailed(e));
            })
    }
}

