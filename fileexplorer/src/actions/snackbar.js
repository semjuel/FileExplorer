import {Markup} from "interweave";
import Button from "@material-ui/core/Button";
import React from "react";

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

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

export const enqueueErrorSnackbar = error => {
    let msg = 'Failed fetching data.';
    if (error.response && error.response.data) {
        msg = msg + ' ' + error.response.data.message;
    }

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            message: <Markup content={msg} />,
            options: {
                variant: 'error',
                action: key => (
                    <Button onClick={() => closeSnackbar(key)}>dissmiss me</Button>
                ),
            },
            key: new Date().getTime() + Math.random(),
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
