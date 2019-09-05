import axios from 'axios'
import {hashFnv32a} from "../services/hash";
import { enqueueErrorSnackbar } from './snackbar';
import { addFiles } from './files';

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_FOLDERS = 'ADD_FOLDERS';
export const UPDATE_FOLDER_DATA = 'UPDATE_FOLDER_DATA';
export const CHANGE_FOLDER_STATUS = 'CHANGE_FOLDER_STATUS';
export const REFRESH_FOLDER = 'REFRESH_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const ADD_CHILD = 'ADD_CHILD';
export const ADD_CHILDREN = 'ADD_CHILDREN';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const REMOVE_CHILDREN = 'REMOVE_CHILDREN';
export const ADD_FILES_TO_FOLDER = 'ADD_FILES_TO_FOLDER';

// @TODO move this to the configs.
const getFoldersUrl = 'http://localhost:9195/admin/file-explorer/entry';
const getFilesUrl = 'http://localhost:9195/admin/file-explorer/entry';

export const fetchFolderData = folder => {
    return (dispatch) => {
        let files = [], fileIds = [];
        let childIds = [], children = [];

        const filesPromise = axios.get(getFilesUrl + '?mode=file&depth=0&path=' + folder.path)
            .then(response => {
                const data = response.data.data;

                data.map(function (el) {
                    el.id = hashFnv32a(el.path);
                    fileIds.push(el.id);
                    files[el.id] = el;
                });
                dispatch(addFiles(files));
            })
            .catch(error => {
                console.log(error);
                dispatch(enqueueErrorSnackbar(error))
            });

        const foldersPromise = axios.get(getFoldersUrl + '?mode=directory&depth=0&path=' + folder.path)
            .then(response => {
                const data = response.data.data;

                data.map(function (el) {
                    el.id = hashFnv32a(el.path + el.name);
                    el.level = folder.level + 1;
                    el.status = 'close';
                    childIds.push(el.id);
                    children[el.id] = el;
                });
                dispatch(addFolders(children));
            })
            .catch(error => {
                console.log(error);
                dispatch(enqueueErrorSnackbar(error))
            });

        return Promise.all([filesPromise, foldersPromise]).then(() => {
            dispatch(updateFolderData(folder.id, childIds, fileIds, 'open'));
        });
    };
};

export const addFolder = folder => {
    const id = folder.id || hashFnv32a(folder.path + folder.name);

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

export const changeFolderStatus = (id, status) => ({
    type: CHANGE_FOLDER_STATUS,
    id,
    status,
});

export const refreshFolder = (id, status) => ({
    type: REFRESH_FOLDER,
    id,
    status,
});

export const deleteFolder = (id) => ({
    type: DELETE_FOLDER,
    id
});

export const updateFolderData = (id, childIds, fileIds, status) => ({
    type: UPDATE_FOLDER_DATA,
    id,
    childIds,
    fileIds,
    status,
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

export const addFilesToFolder = (id, fileIds) => ({
    type: ADD_FILES_TO_FOLDER,
    id,
    fileIds,
});

export const removeChild = (id, childId) => ({
    type: REMOVE_CHILD,
    id,
    childId,
});

export const removeChildren = (id) => ({
    type: REMOVE_CHILDREN,
    id,
});
