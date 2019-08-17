import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AddFolderBtn from './AddFolderBtn/AddFolderBtn';
import FoldersList from './FoldersTree/FoldersList';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,140,254,.4)',
            outline: '1px solid slategrey'
        }
    },
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

export default function Sidebar( props ) {
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
