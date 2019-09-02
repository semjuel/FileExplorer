import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AddFolderBtn from '../../components/LeftSidebar/AddFolderBtn/AddFolderBtn';
import FoldersList from '../../components/LeftSidebar/FoldersTree/FoldersList';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 0,
        position: 'relative',
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#D3E5EE',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function LeftSidebar() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />

            <AddFolderBtn />

            <FoldersList />

        </Drawer>
    );
}
