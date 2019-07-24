import React from 'react';

import Aux from '../../hoc/Aux';
import Header from '../Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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

const drawerWidth = 240;

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

export default function Layout( props ) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    function handleClick() {
        setOpen(!open);
    }

    return (
        <Aux>
            <Header />

            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />

                    <Button size="large" variant="contained" className={classes.button}>
                        <NewFolderIcon className={classes.leftIcon} />
                        Add folder
                    </Button>

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
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.mainWrapper}>
                        {props.children}
                    </div>
                </main>
            </div>
        </Aux>
    );
}
