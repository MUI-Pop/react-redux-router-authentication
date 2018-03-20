import * as ACTIONTYPES from '../actions/actionTypes';

const initialState = {
    accessToken: null,
    errored: null,
    loading: false,
    userId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTIONTYPES.AUTH_FAILED:
            return {
                ...state,
                errored: true,
                loading: false,
                error: action.error
            }

        case ACTIONTYPES.AUTH_INIT:
            return {
                ...state,
                loading: true
            }

        case ACTIONTYPES.AUTH_SUCCESS:
            return {
                ...state,
                accessToken: action.accessToken,
                userId: action.userId,
                loading: false,
            }

        default:
            return state;
    }
}

export default reducer;