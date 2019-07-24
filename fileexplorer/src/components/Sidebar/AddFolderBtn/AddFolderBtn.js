import React from 'react';
import {makeStyles} from "@material-ui/core";
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

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
    back: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: '#FEFEFE',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function AddFolderBtn( props ) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
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

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <AddFolderForm />
                </div>
            </Modal>
        </Aux>
    );
}
