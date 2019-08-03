import React, {useState} from 'react';
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
import { Markup } from 'interweave';

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
    btns: {
        padding: '8px 24px 16px',
    },
    button: {
        background: '#008CFE',
        color: '#fff',
        '&:hover': {
            background: '#006AFE',
        },
    },
}));

export default function AddFolderForm( props ) {
    const classes = useStyles();
    const [folderName, setFolderName] = useState();

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
        axios.post('http://localhost:9195/admin/file-explorer/entry', {
            path: "/",
            name: folderName,

        })
        .then(function (response) {
            console.log(response);
            enqueueSnackbar('Folder has been created.', {variant: 'success', anchorOrigin: position,});
        })
        // @TODO handle this correctly.
        .catch(function (error) {
            let msg = 'Can\'t create a folder.';
            if (error.response.data) {
                msg = msg + ' ' + error.response.data.message;
            }

            enqueueSnackbar(<Markup content={msg} />, {variant: 'error', anchorOrigin: position,})
        });
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
                    onChange={(e) => setFolderName(e.target.value.trim())}
                    fullWidth
                />
            </DialogContent>

            <DialogActions className={classes.btns}>
                <Button onClick={props.close} color="primary">
                    Cancel
                </Button>
                <Button className={classes.button} variant="contained" onClick={createFolder} color="primary" disabled={!folderName}>
                    Create
                </Button>
            </DialogActions>
        </Aux>
    );
}