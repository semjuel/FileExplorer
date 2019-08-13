import {ADD_FOLDER, ADD_FOLDERS, REMOVE_FOLDER, SET_SELECTED} from '../actions';

const defaultState = {
    selected: null,
};

const selected = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED:
            state.selected = action.folder;
            return {
                ...state
            };

        default:
            return state
    }
};

export default selected