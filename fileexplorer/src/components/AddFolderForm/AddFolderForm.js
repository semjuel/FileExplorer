import React, { Component, useState, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from "@material-ui/core/Tooltip";
import axios from 'axios'
import { Markup } from 'interweave';
import { bindActionCreators } from 'redux';

import Aux from '../../hoc/Aux';
import {addFolder, closeSnackbar, enqueueSnackbar} from "../../actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        '&:hover': {
            background: 'none',
            color: '#000',
        },
    },
    content: {
        width: '350px',
    },
    btns: {
        padding: '8px 24px 16px',
    },
    button: {
        background: '#008CFE',
        color: '#fff',
        '&:hover': {
            background: '#006AFE',
        },
    },
});

class AddFolderForm extends Component {
    state = {
        folderName: '',
    };

    setFolderName = (name) => {
        this.setState(prevState => ({
            folderName: name,
        }));
    };

    createFolder() {
        // @TODO send request to the backend.
        let self = this;

        this.props.enqueueSnackbar({
            message: 'Creating folder...',
            options: {
                key: new Date().getTime() + Math.random(),
                //variant: 'warning',
                action: key => (
                    <Button onClick={() => this.props.closeSnackbar(key)}>dissmiss me</Button>
                ),
            },
        });

        // Close modal window.
        this.props.close();

        // @TODO add valid messages.
        axios.post('http://localhost:9195/admin/file-explorer/entry', {
            path: "/",
            name: self.state.folderName,

        })
            .then(function (response) {
                console.log(response);
                self.props.enqueueSnackbar({
                    message: 'Folder has been created.',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: key => (
                            <Button onClick={() => self.props.closeSnackbar(key)}>dissmiss me</Button>
                        ),
                    },
                });
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                let msg = 'Can\'t create a folder.';
                if (error.response && error.response.data) {
                    msg = msg + ' ' + error.response.data.message;
                }

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
                <DialogTitle id="form-dialog-title">
                    New folder

                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.close}>
                        <Tooltip title="Close">
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>
                </DialogTitle>

                <DialogContent className={classes.content}>
                    <TextField
                        autoFocus
                        required
                        id="folder-name"
                        label="Enter Folder name"
                        variant="outlined"
                        onChange={(e) => this.setFolderName(e.target.value.trim())}
                        fullWidth
                    />
                </DialogContent>

                <DialogActions className={classes.btns}>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
                    </Button>
                    <Button className={classes.button} variant="contained" onClick={() => this.createFolder()} color="primary" disabled={!this.state.folderName}>
                        Create
                    </Button>
                </DialogActions>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addFolder,
}, dispatch);

AddFolderForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddFolderForm));
