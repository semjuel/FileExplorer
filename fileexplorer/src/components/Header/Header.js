import React, {Component} from 'react';
import axios from "axios";
import {withStyles} from '@material-ui/core/styles';
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
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {showModal} from "../../actions";
import {hashFnv32a} from "../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";

const styles = theme => ({
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
});

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleOpen() {
        this.props.showModal(true);
    };

    handleRefresh() {
        return;
        if (this.props.folder.loading) {
            return;
        }

        // @TODO move this to the service.
        this.props.changeFolderStatus(this.props.selected, false, true);

        // Remove children.
        this.props.removeChildren(this.props.selected);

        let self = this;
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

                // self.props.addChildren(self.props.folder.id, childIds);
                // self.props.addFolders(children);

                self.props.changeFolderStatus(self.props.id, true, false);
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

                self.props.changeFolderStatus(self.props.id, true, false);
            });
    };

    render() {
        const { classes } = this.props;

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

                    <IconButton className={classes.icon} onClick={this.handleRefresh} disabled aria-label="Refresh">
                        <RefreshIcon />
                    </IconButton>

                    <IconButton className={classes.icon} aria-label="Upload File" disabled>
                        <UploadIcon />
                    </IconButton>

                    <IconButton className={classes.icon} onClick={this.handleOpen} aria-label="New Folder">
                        <NewFolderIcon />
                    </IconButton>

                    <IconButton className={classes.icon} aria-label="File Copy" disabled>
                        <FileCopyIcon />
                    </IconButton>

                    <IconButton className={classes.icon} aria-label="Rename" disabled>
                        <RenameIcon />
                    </IconButton>

                    <IconButton className={classes.icon} aria-label="Delete" disabled>
                        <DeleteIcon />
                    </IconButton>


                    <Divider className={classes.divider} />

                    <IconButton className={classes.icon} aria-label="Switch view" disabled>
                        <ViewGridIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="Switch view" disabled>
                        <ViewListIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="Settings" disabled>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="File information" disabled>
                        <InfoIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showModal,
}, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));
