import { ATTEMPT_REGISTRATION, ACCEPT_REGISTRATION, REJECT_REGISTRATION, LOAD_REGISTRATION, HIDE_REGISTRATION } from '../actions/action-types';

const initialState = {
    loading: false,
    loadPage: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_REGISTRATION:
            return { ...state, loadPage: true };
            break;
        case ATTEMPT_REGISTRATION:
            return { ...state, loading: true };
            break;
        case ACCEPT_REGISTRATION:
            document.cookie = "token=" + action.token;
            return { ...state, token: action.token, loading: false };
            break;
        case REJECT_REGISTRATION:
            return { ...state, token: undefined, loading: false };
            break;
        case HIDE_REGISTRATION:
            return { ...state, loadPage: false };
            break;
    }
    return state;
}