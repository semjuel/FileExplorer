import React from 'react';
import {makeStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from "@material-ui/core/Tooltip";
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios'

import Aux from '../../hoc/Aux';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        '&:hover': {
            background: 'none',
            color: '#000',
        },
    },
    content: {
        width: '350px',
    },
}));

export default function AddFolderForm( props ) {
    const classes = useStyles();

    const position = {
        vertical: 'top',
        horizontal: 'right',
    };

    const { enqueueSnackbar } = useSnackbar();

    function createFolder() {
        // @TODO send request to the backend.

        enqueueSnackbar('Creating folder...', {anchorOrigin: position,});

        // Close modal window.
        props.close();

        // @TODO add valid messages.
        axios.get('http://localhost:3000/')
            .then(() => enqueueSnackbar('Folder has been created.', {variant: 'success', anchorOrigin: position,}))
            .catch(() => enqueueSnackbar('Can\'t create a folder.', {variant: 'error', anchorOrigin: position,}));
    }

    return (
        <Aux>
            <SnackbarProvider maxSnack={3} />
            <DialogTitle id="form-dialog-title">
                New folder

                <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
                    <Tooltip title="Close">
                        <CloseIcon />
                    </Tooltip>
                </IconButton>

            </DialogTitle>
            <DialogContent className={classes.content}>
                <TextField
                    autoFocus
                    required
                    id="folder-name"
                    label="Enter Folder name"
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="primary">
                    Cancel
                </Button>
                <Button onClick={createFolder} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Aux>
    );
}
