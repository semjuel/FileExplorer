import { ADD_FOLDER, ADD_FOLDERS, REMOVE_FOLDER } from '../actions';

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

        case ADD_FOLDERS:
            return {
                ...state,
                folders: [
                    ...state.folders,
                    ...action.folders,
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
