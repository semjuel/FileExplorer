export const SHOW_MODAL = 'SHOW_MODAL';

export const showModal = (modalStatus) => {
    return {
        type: SHOW_MODAL,
        modalStatus: modalStatus,
    };
};
