import { ATTEMPT_LOGIN } from '../actions/action-types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case ATTEMPT_LOGIN:
            return { ...state, error: "No error" };
            break;
    }
    return state;
}