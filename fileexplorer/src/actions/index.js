export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const ADD_FOLDER = 'ADD_FOLDER';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';

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

export const removeFolder = key => ({
    type: REMOVE_FOLDER,
    key,
});
