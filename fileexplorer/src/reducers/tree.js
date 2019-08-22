import { ADD_CHILD, ADD_CHILDREN, REMOVE_CHILD, REMOVE_CHILDREN,
    ADD_FOLDER, ADD_FOLDERS, DELETE_FOLDER, CHANGE_FOLDER_STATUS, REFRESH_FOLDER } from '../actions'

const childIds = (state, action) => {
    switch (action.type) {
        case ADD_CHILD:
            return [ ...state, action.childId ];
        case ADD_CHILDREN:
            return [ ...state, ...action.childIds ];
        case REMOVE_CHILD:
            return state.filter(id => id !== action.childId);
        default:
            return state
    }
};

const tree = (state, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {
                ...action.folder
            };
        case CHANGE_FOLDER_STATUS:
            return {
                ...state,
                open: action.open,
                loading: action.loading,
            };
        case REFRESH_FOLDER:
            return {
                ...state,
                refresh: action.status,
                open: !action.status,
                loading: action.status,
            };
        case ADD_CHILD:
        case REMOVE_CHILD:
            return {
                ...state,
                childIds: childIds(state.childIds || [], action)
            };
        case ADD_CHILDREN:
            return {
                ...state,
                childIds: childIds(state.childIds || [], action)
            };
        case REMOVE_CHILDREN:
            return {
                ...state,
                childIds: [],
            };
        default:
            return state
    }
};

const getAllDescendantIds = (state, nodeId) => {
    if (typeof state[nodeId] === 'undefined' ||
        typeof state[nodeId].childIds === 'undefined') {
        return [];
    }

    return  state[nodeId].childIds.reduce((acc, childId) => (
        [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
    ), []);
};

const deleteMany = (state, ids) => {
    state = { ...state };
    ids.forEach(id => delete state[id]);
    return state
};

let root = {
    0: {
        id: 0,
        name: 'root',
        level: 0,
        path: '/',
        type: 'directory',
        loading: true,
        open: false,
    }
};
export default (state = root, action) => {
    if (action.type === ADD_FOLDERS) {
        return {
            ...state,
            ...action.folders
        };
    }

    const { id } = action;
    if (typeof id === 'undefined') {
        return state
    }

    if (action.type === DELETE_FOLDER) {
        const descendantIds = getAllDescendantIds(state, id);
        return deleteMany(state, [ id, ...descendantIds ])
    }

    return {
        ...state,
        [id]: tree(state[id], action)
    }
}
