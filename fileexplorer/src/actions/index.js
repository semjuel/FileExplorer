import {hashFnv32a} from "../services/hash";

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const ADD_FOLDERS = 'ADD_FOLDERS';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';

export const SET_SELECTED = 'SET_SELECTED';

export const addFolders = folders => {
    // @TODO change this.
    return {
        type: ADD_FOLDERS,
        folders: folders,
    };
};

export const removeFolder = key => ({
    type: REMOVE_FOLDER,
    key,
});

export const setSelected = folder => {
    // @TODO change this.
    return {
        type: SET_SELECTED,
        folder: {
            ...folder,
        },
    };
};

export const ADD_FOLDER = 'ADD_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const ADD_CHILD = 'ADD_CHILD';
export const ADD_CHILDREN = 'ADD_CHILDREN';
export const REMOVE_CHILD = 'REMOVE_CHILD';

export const addFolder = folder => {
    const id = folder.id || hashFnv32a(folder.name) + Math.random();

    return {
        type: ADD_FOLDER,
        folder: {
            ...folder,
        },
        id: id,
    };
};

export const deleteFolder = (id) => ({
    type: DELETE_FOLDER,
    id
});

export const addChild = (id, childId) => ({
    type: ADD_CHILD,
    id,
    childId
});

export const addChildren = (id, children) => ({
    type: ADD_CHILDREN,
    id,
    children
});

export const removeChild = (id, childId) => ({
    type: REMOVE_CHILD,
    id,
    childId
});
