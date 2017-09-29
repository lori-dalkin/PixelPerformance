import { ADD_PRODUCT, CONFIRM_ADD, REJECT_ADD } from '../actions/action-types'

const initialState = { ready: false };

export default function (state = initialState, action){
    switch(action.type){
        case ADD_PRODUCT:
            return { ...state, ready: true };
            break;
        case CONFIRM_ADD:
            return { ...state, ready: true };
            break;
        case REJECT_ADD:
            return { ...state, ready: false };
            break;
    }
    return state;
}