import { ACCEPT_REGISTRATION, REJECT_REGISTRATION, SHOW_REGISTRATION, HIDE_REGISTRATION } from '../actions/action-types';

const initialState = {
    openRegistration: false
};

export default function (state = initialState, action) {
    switch (action.type) {
            case SHOW_REGISTRATION:
            return { ...state, openRegistration: true };
            break;
        case ACCEPT_REGISTRATION:
            return { ...state, openRegistration: false };
            break;
        case REJECT_REGISTRATION:
            return { ...state, openRegistration: false };
            break;
        case HIDE_REGISTRATION:
            return { ...state, openRegistration: false };
            break;
    }
    return state;
}