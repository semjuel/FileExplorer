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

                <IconButton className={classes.icon} aria-label="Refresh">
                    <RefreshIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Refresh">
                    <UploadIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Refresh">
                    <NewFolderIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Refresh">
                    <FileCopyIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Refresh">
                    <RenameIcon />
                </IconButton>

                <IconButton className={classes.icon} aria-label="Refresh">
                    <DeleteIcon />
                </IconButton>


                <Divider className={classes.divider} />

                <IconButton className={classes.icon} aria-label="Switch view">
                    <ViewGridIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="Switch view">
                    <ViewListIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="Settings">
                    <SettingsIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="File information">
                    <InfoIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}
