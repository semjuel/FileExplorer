import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import MoreIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const styles = theme => ({
});

class FolderItem extends Component {
    render() {
        return (
            <ListItem button>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={
                    <Tooltip title={this.props.title}>
                        <Typography noWrap display={"block"} component="span">
                            {this.props.title}
                        </Typography>
                    </Tooltip>
                } />

                {
                    /*<ListItem button>
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
                    <ListItem button>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Delete">
                                <MoreIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>*/}{/*
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
                    </Collapse>*/
                }

            </ListItem>


        );
    }
}

export default withStyles(styles)(FolderItem);
