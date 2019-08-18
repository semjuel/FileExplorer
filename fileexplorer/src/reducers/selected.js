import { SET_SELECTED } from '../actions';

const defaultState = 0;
export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED:
            return action.id;

        default:
            return state
    }
};
