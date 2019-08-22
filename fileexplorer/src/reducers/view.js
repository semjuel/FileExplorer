import { VIEW_MODE } from '../actions';

const defaultState = false;
export default (state = defaultState, action) => {
    switch (action.type) {
        case VIEW_MODE:
            return action.mode;

        default:
            return state
    }
};
