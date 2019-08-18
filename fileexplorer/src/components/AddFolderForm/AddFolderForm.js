import React, { Component, Fragment } from 'react';
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

import {addChild, addFolder, closeSnackbar, enqueueSnackbar} from "../../actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {hashFnv32a} from "../../services/hash";

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
        let cKey = new Date().getTime() + Math.random();

        this.props.enqueueSnackbar({
            message: 'Creating folder...',
            options: {
                key: cKey,
            },
        });

        // Close modal window.
        this.props.close();

        let folder = this.props.folder;

        // @TODO add valid messages.
        axios.post('http://localhost:9195/admin/file-explorer/entry', {
            path: folder.path,
            name: self.state.folderName,

        })
            .then(function (response) {
                setTimeout(() => self.props.closeSnackbar(cKey), 500);

                // @TODO validate response.
                let newFolder = response.data.data;
                newFolder = {
                    ...newFolder,
                    id: hashFnv32a(newFolder.name) + Math.random(),
                    level: folder.level + 1,
                };

                self.props.addFolder(newFolder);
                self.props.addChild(folder.id, newFolder.id);

                let msg = 'Folder has been created.';
                self.props.enqueueSnackbar({
                    message: <Markup content={msg} />,
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
                setTimeout(() => self.props.closeSnackbar(cKey), 500);

                let msg = 'Can\'t create a folder.';
                if (error.response && error.response.data) {
                    msg = msg + ' ' + error.response.data.message;
                }

                self.props.enqueueSnackbar({
                    message: <Markup content={msg} />,
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

const mapStateToProps = state => {
    return {
        folder: state.tree[state.selected],
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addFolder,
    addChild,
}, dispatch);

AddFolderForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddFolderForm));
