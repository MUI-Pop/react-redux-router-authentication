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

const authSuccess = () => {
    return {
        type: ACTIONTYPES.AUTH_SUCCESS,
    }
}

const monitorTokenExpiry = () => {
    const tokenExpiresAt = localStorage.getItem('expires_at');

    if(new Date().getTime > tokenExpiresAt){
        localStorage.clear();
        
        return{
            type: ACTIONTYPES.AUTH_EXPIRED
        }
    }
}

const loggedIn = (accessToken, userId, expires_at) => {
    localStorage.clear();
    localStorage.setItem('token',accessToken);
    localStorage.setItem('userId',userId);
    localStorage.setItem('expires_at',expires_at);
}

export const authenticate = (username, password, client_id = CLIENT_ID, client_secret = CLIENT_SECRET, grant_type = GRANT_TYPE) => {

    return (dispatch) => {
        dispatch(authStart());

        const searchParams = new URLSearchParams();
        searchParams.set('username', username);
        searchParams.set('password', password);
        searchParams.set('grant_type', grant_type);
        searchParams.set('client_id', client_id);
        searchParams.set('client_secret', client_secret);

        axios.post(`${API_BASE_URL}/api/login`, searchParams)
            .then(response => {
                loggedIn(response.data.accessToken, response.data.user.loginId, response.data.expires_at);
                dispatch(authSuccess());
            }).catch(e => {
                dispatch(authFailed(e));
            })
    }
}

