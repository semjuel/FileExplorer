import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Toolbar from "@material-ui/core/Toolbar";
import InfoIcon from '@material-ui/icons/Info';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import UploadIcon from '@material-ui/icons/CloudUpload';
import RenameIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import {bindActionCreators} from "redux";
import {
    addChildren,
    addFolders, changeFolderStatus,
    closeSnackbar, deleteFolder,
    enqueueSnackbar,
    refreshFolder,
    removeChildren,
    showModal
} from "../../actions";
import axios from "axios";
import {hashFnv32a} from "../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    icon: {
        '&:hover': {
            color: '#006AFE',
        }
    },
});

class ActionBtns extends Component {
    constructor(props) {
        super(props);

        this.handleNewFolder = this.handleNewFolder.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleNewFolder() {
        this.props.showModal(true);
    };

    handleRefresh() {
        let self = this;
        // @TODO move this to the service.
        if (this.props.folder.loading) {
            return;
        }

        this.props.refreshFolder(this.props.folder.id, true);

        // Remove folders from state.
        this.props.folder.childIds.forEach(function (id) {
            console.log(id);
            self.props.deleteFolder(id);
        });
        // self.props.changeFolderStatus(self.props.folder.id, true, false);
        console.log('Tree', this.props.tree);
        // Remove children.
        this.props.removeChildren(this.props.folder.id);
        console.log(this.props.folder);


        const path = this.props.folder.path;
        // Make request.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0&path=' + path)
            .then(function (response) {
                let data = response.data.data;
                let childIds = [], children = [];
                data.map(function (el) {
                    el.id = hashFnv32a(el.path + el.name);
                    el.level = self.props.folder.level + 1;
                    childIds.push(el.id);
                    children[el.id] = el;
                });

                console.log(children);

                self.props.addFolders(children);
                self.props.addChildren(self.props.folder.id, childIds);

                self.props.changeFolderStatus(self.props.folder.id, true, false);
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                console.log(error);
                let msg = 'Failed fetching data.';
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

                self.props.changeFolderStatus(self.props.folder.id, true, false);
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <IconButton className={classes.icon} onClick={this.handleRefresh} aria-label="Refresh">
                    <RefreshIcon/>
                </IconButton>

                <IconButton className={classes.icon} aria-label="Upload File" disabled>
                    <UploadIcon/>
                </IconButton>

                <IconButton className={classes.icon} onClick={this.handleNewFolder} aria-label="New Folder">
                    <NewFolderIcon/>
                </IconButton>

                <IconButton className={classes.icon} aria-label="File Copy" disabled>
                    <FileCopyIcon/>
                </IconButton>

                <IconButton className={classes.icon} aria-label="Rename" disabled>
                    <RenameIcon/>
                </IconButton>

                <IconButton className={classes.icon} aria-label="Delete" disabled>
                    <DeleteIcon/>
                </IconButton>
            </React.Fragment>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return  {
        tree: state.tree,
        folder: state.tree[state.selected],
        selected: state.selected,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    showModal,
    refreshFolder,
    removeChildren,
    addFolders,
    addChildren,
    changeFolderStatus,
    deleteFolder,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActionBtns));
