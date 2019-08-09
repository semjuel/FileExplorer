import { ADD_FOLDER, REMOVE_FOLDER } from '../actions';

const defaultState = {
    folders: [],
};

const foldersTree = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {
                ...state,
                folders: [
                    ...state.folders,
                    {
                        key: action.key,
                        ...action.folder,
                    },
                ],
            };

        case REMOVE_FOLDER:
            return {
                ...state,
                folders: state.folders.filter(
                    folder => folder.key !== action.key,
                ),
            };

        default:
            return state
    }
};

export default foldersTree
