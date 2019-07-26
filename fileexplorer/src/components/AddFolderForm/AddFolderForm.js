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
        width: '300px',
    },
}));

export default function AddFolderForm( props ) {
    const classes = useStyles();

    return (
        <Aux>
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
                <Button onClick={props.close} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Aux>
    );
}
