import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import AddFolderBtn from './AddFolderBtn/AddFolderBtn';
import FoldersList from './FoldersList/FoldersList';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
    mainWrapper: {

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: '#E8F1F7',
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


export default function Sidebar( props ) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    function handleClick() {
        setOpen(!open);
    }

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
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                dense={true}
            >

                <ListItem button>
                    <ListItemIcon>
                        <FolderOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Tooltip title="1 Sent mail Sent mail Sent mailSent mail Sent mail">
                            <Typography noWrap display={"block"} component="span">
                                Sent mail Sent mail Sent mailSent mail Sent mail
                            </Typography>
                        </Tooltip>
                    } />

                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Tooltip title="1 Drafts">
                            <Typography noWrap display={"block"} component="span">
                                Drafts Drafts Drafts Drafts Drafts
                            </Typography>
                        </Tooltip>
                    } />

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete">
                            <MoreIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete">
                            <MoreIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense={true} component="div" disablePadding>
                        <ListItem button onClick={handleClick} button className={classes.nested}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                            {open ? <ExpandLess /> : <ExpandMore />}

                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Delete">
                                    <MoreIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List dense={true} component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="Delete">
                                            <MoreIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}
