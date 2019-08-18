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

export const SET_SELECTED = 'SET_SELECTED';

export const setSelected = id => {
    return {
        type: SET_SELECTED,
        id,
    };
};

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_FOLDERS = 'ADD_FOLDERS';
export const CHANGE_FOLDER_STATUS = 'CHANGE_FOLDER_STATUS';
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

export const addFolders = folders => {
    return {
        type: ADD_FOLDERS,
        folders: folders,
    };
};

export const changeFolderStatus = (id, open, loading) => ({
    type: CHANGE_FOLDER_STATUS,
    id,
    open,
    loading,
});

export const deleteFolder = (id) => ({
    type: DELETE_FOLDER,
    id
});

export const addChild = (id, childId) => ({
    type: ADD_CHILD,
    id,
    childId,
});

export const addChildren = (id, childIds) => ({
    type: ADD_CHILDREN,
    id,
    childIds,
});

export const removeChild = (id, childId) => ({
    type: REMOVE_CHILD,
    id,
    childId
});
