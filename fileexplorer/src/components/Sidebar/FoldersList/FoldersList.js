import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import {Markup} from "interweave";
import { withStyles } from "@material-ui/core/styles"
import {closeSnackbar, enqueueSnackbar} from "../../../actions";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
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

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: '#E8F1F7',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class FoldersList extends React.Component {
    handleClick = () => {

        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on,
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of number or characters, but it has to be unique to a given snackbar.
        this.props.enqueueSnackbar({
            message: 'Failed fetching data.',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'warning',
                action: key => (
                    <Button onClick={() => this.props.closeSnackbar(key)}>dissmiss me</Button>
                ),
            },
        });
    };

    componentDidMount() {
        const position = {
            vertical: 'top',
            horizontal: 'right',
        };
        let self = this;
        // @TODO add valid messages.
        axios.get('http://localhost:9195/admin/file-explorer/entry')
            .then(function (response) {
                console.log(response);
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                console.log(error);
                let msg = 'Failed fetching data.';
                // if (error.response && error.response.data) {
                //     msg = msg + ' ' + error.response.data.message;
                // }

                self.props.enqueueSnackbar({
                    message: msg,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        action: key => (
                            <Button onClick={() => self.props.closeSnackbar(key)}>dissmiss me</Button>
                        ),
                    },
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <div onClick={this.handleClick}>
                    Folder list will be here ...
                </div>

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
                    </ListItem>{/*
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
                    </Collapse>*/}
                </List>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
}, dispatch);

FoldersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(FoldersList));
