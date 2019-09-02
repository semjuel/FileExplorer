import { ADD_FILE, ADD_FILES, DELETE_FILE } from '../actions'

const files = (state, action) => {
    switch (action.type) {
        case ADD_FILE:
            return {
                ...action.file
            };
        default:
            return state
    }
};

export default (state = [], action) => {
    if (action.type === ADD_FILES) {
        return {
            ...state,
            ...action.files
        };
    }

    const { id } = action;
    if (typeof id === 'undefined') {
        return state
    }

    if (action.type === DELETE_FILE) {
        // @TODO implement this.
    }

    return {
        ...state,
        [id]: files(state[id], action)
    }
}
