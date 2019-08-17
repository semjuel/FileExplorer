export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_FOLDERS = 'ADD_FOLDERS';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';

export const SET_SELECTED = 'SET_SELECTED';

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

export const addFolder = folder => {
    const key = folder.options && folder.options.key;

    // @TODO change this.
    return {
        type: ADD_FOLDER,
        folder: {
            ...folder,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

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

export const INCREMENT = 'INCREMENT';
export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';

export const increment = (nodeId) => ({
    type: INCREMENT,
    nodeId
});

let nextId = 0;
export const createNode = () => ({
    type: CREATE_NODE,
    nodeId: `new_${nextId++}`
});

export const deleteNode = (nodeId) => ({
    type: DELETE_NODE,
    nodeId
});

export const addChild = (nodeId, childId) => ({
    type: ADD_CHILD,
    nodeId,
    childId
});

export const removeChild = (nodeId, childId) => ({
    type: REMOVE_CHILD,
    nodeId,
    childId
});
