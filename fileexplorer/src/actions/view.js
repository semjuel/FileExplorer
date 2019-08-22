export const VIEW_MODE = 'VIEW_MODE';

export const changeViewMode = mode => {
    return {
        type: VIEW_MODE,
        mode,
    };
};
