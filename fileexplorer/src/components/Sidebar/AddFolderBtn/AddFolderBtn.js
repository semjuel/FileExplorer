import React from 'react';
import {makeStyles} from "@material-ui/core";
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';

import Aux from '../../../hoc/Aux';
import AddFolderForm from '../../AddFolderForm/AddFolderForm';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(5, 3, 2),
        background: '#008CFE',
        textTransform: 'none',
        color: '#fff',
        '&:hover': {
            background: '#006AFE',
        },
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));


export default function AddFolderBtn( props ) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Aux>
            <Button size="large" variant="contained" className={classes.button} onClick={handleOpen}>
                <NewFolderIcon className={classes.leftIcon} />
                Add folder
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <AddFolderForm close={handleClose} />
            </Dialog>
        </Aux>
    );
}
