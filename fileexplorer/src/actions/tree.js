import {hashFnv32a} from "../services/hash";

export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_FOLDERS = 'ADD_FOLDERS';
export const CHANGE_FOLDER_STATUS = 'CHANGE_FOLDER_STATUS';
export const REFRESH_FOLDER = 'REFRESH_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const ADD_CHILD = 'ADD_CHILD';
export const ADD_CHILDREN = 'ADD_CHILDREN';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const REMOVE_CHILDREN = 'REMOVE_CHILDREN';
export const ADD_FILES_TO_FOLDER = 'ADD_FILES_TO_FOLDER';

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


// export const createFolder = folder => (dispatch, getState) => {
//     axios.get().then(res => {
//         dispatch(addFolder((folder)))
//     }).catch(err => {
//         dispatch(enqueueSnackbar({
//             message: <Markup content={msg} />,
//             options: {
//                 key: new Date().getTime() + Math.random(),
//                 variant: 'error',
//                 action: key => (
//                     <Button onClick={() => self.props.closeSnackbar(key)}>dissmiss me</Button>
//                 ),
//             },
//         }))
//     })
//
// }

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

export const refreshFolder = (id, status) => ({
    type: REFRESH_FOLDER,
    id,
    status,
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
