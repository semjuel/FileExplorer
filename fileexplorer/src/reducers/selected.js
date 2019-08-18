import { SET_SELECTED } from '../actions';

const defaultState = null;
export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return action.id;

        default:
            return state
    }
};
