export const SET_SELECTED = 'SET_SELECTED';

export const setSelected = id => {
    return {
        type: SET_SELECTED,
        id,
    };
};
