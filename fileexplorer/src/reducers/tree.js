import { ADD_CHILD, ADD_CHILDREN, REMOVE_CHILD, ADD_FOLDER, DELETE_FOLDER } from '../actions'
import {hashFnv32a} from "../services/hash";

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
                ...action.folder,
                childIds: []
            };
        case ADD_CHILD:
        case REMOVE_CHILD:
            return {
                ...state,
                childIds: childIds(state.childIds, action)
            };
        case ADD_CHILDREN:
            return {
                ...state,
                childIds: childIds(state.childIds, action)
            };
        default:
            return state
    }
};

const getAllDescendantIds = (state, nodeId) => (
    state[nodeId].childIds.reduce((acc, childId) => (
        [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
    ), [])
);

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
        childIds: [],
    }
};
export default (state = root, action) => {
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
