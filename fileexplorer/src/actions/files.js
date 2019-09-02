import {hashFnv32a} from "../services/hash";

export const ADD_FILE = 'ADD_FILE';
export const ADD_FILES = 'ADD_FILES';
export const DELETE_FILE = 'DELETE_FILE';

export const addFile = file => {
    const id = file.id || hashFnv32a(file.path);

    return {
        type: ADD_FILE,
        file: {
            ...file,
        },
        id: id,
    };
};

export const addFiles = files => {
    return {
        type: ADD_FILES,
        files: files,
    };
};

export const deleteFile = (id) => ({
    type: DELETE_FILE,
    id
});
