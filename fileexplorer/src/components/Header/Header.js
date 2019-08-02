import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewGridIcon from '@material-ui/icons/Apps';
import InfoIcon from '@material-ui/icons/Info';
import RefreshIcon from '@material-ui/icons/Refresh';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import UploadIcon from '@material-ui/icons/CloudUpload';
import RenameIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import AddFolderForm from "../AddFolderForm/AddFolderForm";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(theme => ({
    bar: {
      background: '#fff',
        color: '#000',
        zIndex: 1,
    },
    grow: {
        flexGrow: 1,
    },
    divider: {
        margin: '0 20px',
        width: '1px',
        height: '50px',
    },
    icon: {
        '&:hover': {
            color: '#006AFE',
        }
    },
}));


export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AppBar className={classes.bar} position="fixed">
            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                >
                    FileExplorer
                </Typography>

                <div className={classes.grow} />

                <Divider className={classes.divider} />

                <IconButton className={classes.icon} aria-label="Refresh" disabled>
                    <RefreshIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Upload File" disabled>
                    <UploadIcon />
                </IconButton>

                <IconButton className={classes.icon} onClick={handleOpen} aria-label="New Folder">
                    <NewFolderIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="File Copy" disabled>
                    <FileCopyIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Rename" disabled>
                    <RenameIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Delete" disabled>
                    <DeleteIcon />
                </IconButton>


                <Divider className={classes.divider} />

                <IconButton className={classes.icon} aria-label="Switch view" disabled>
                    <ViewGridIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="Switch view" disabled>
                    <ViewListIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="Settings" disabled>
                    <SettingsIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="File information" disabled>
                    <InfoIcon />
                </IconButton>

            </Toolbar>

            {/* @TODO review this - duplicated code */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <AddFolderForm close={handleClose} />
            </Dialog>
        </AppBar>
    );
}
