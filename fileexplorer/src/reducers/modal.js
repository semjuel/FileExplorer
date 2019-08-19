import { SHOW_MODAL } from '../actions';

export default (state = false, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return action.modalStatus;

        default:
            return state
    }
};
