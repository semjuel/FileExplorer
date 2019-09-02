import React from 'react'
import { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {bindActionCreators} from "redux";
import {setSelected, changeFolderStatus, enqueueSnackbar, closeSnackbar, addFolders, addChildren, addFiles, addFilesToFolder} from "../../../actions";
import {hashFnv32a} from "../../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";

import "./style.css";

const itemIconStyle = {
    minWidth: '30px',
};

const moreIconStyle = {
    width: '12px',
    height: '12px',
};

const FolderIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M27 8L27 21C27 22.05 26.16 23 25 23L3 23C1.84 23 1 22.05 1 21L1 3C1 2.07 1.98 1 3 1L9 1C10.02 1 11 2.07 11 3L11 6L25 6C26.16 6 27 6.95 27 8Z"/>
    </SvgIcon>
);

const PlusIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M1 6L12 6L12 7L1 7L1 6Z"/>
        <path d="M6 1L7 1L7 12L6 12L6 1Z"/>
    </SvgIcon>
);

const MinusIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M1 6L12 6L12 7L1 7L1 6Z"/>
    </SvgIcon>
);

export class Tree extends Component {
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    static getNestedStyle(level) {
        const p = 22 +  10 * level;
        return {
            paddingLeft: p + 'px',
            paddingRight: '22px',
        };
    }

    renderChild = childId => {
        const { id, level } = this.props.folder;
        return (
            <ConnectedTree key={childId} id={childId} styling={Tree.getNestedStyle(level + 1)}  parentId={id} />
        )
    };

    handleItemClick() {
        if (this.props.folder.loading) {
            return;
        }

        this.props.setSelected(this.props.id);

        // In case element has children - don't make request, just collapse children block.
        if (typeof this.props.folder.childIds !== 'undefined' && this.props.folder.childIds.length > 0) {
            this.props.changeFolderStatus(this.props.id, !this.props.folder.open, false);

            return;
        }

        let self = this;
        this.props.changeFolderStatus(this.props.id, this.props.folder.open, true);

        const path = this.props.folder.path;

        // Make request to get files in current folder.
        let fileIds = [];
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=file&depth=0&path=' + path)
            .then(function (response) {
                let data = response.data.data;

                let files = [];
                console.log(data);
                data.map(function (el) {
                    el.id = hashFnv32a(el.path);
                    fileIds.push(el.id);
                    files[el.id] = el;
                });
                self.props.addFiles(files);

                // @TODO review this.
                self.props.addFilesToFolder(self.props.id, fileIds);
            })
            .catch(function (error) {
                console.log(error);
                let msg = 'Failed fetching files.';
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

        // Make request.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0&path=' + path)
            .then(function (response) {
                let data = response.data.data;
                let childIds = [], children = [];
                data.map(function (el) {
                    el.id = hashFnv32a(el.path + el.name);
                    el.refresh = false;
                    el.level = self.props.folder.level + 1;
                    childIds.push(el.id);
                    children[el.id] = el;
                });

                self.props.addChildren(self.props.id, childIds);
                self.props.addFolders(children);
            })
            // @TODO handle this correctly.
            .catch(function (error) {
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
            })
            .then(function () {
                // @TODO not sure that this code is always executing.
                // Always executed.
                self.props.changeFolderStatus(self.props.id, true, false);
            });


    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
    }

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('nextProps', nextProps);
        console.log('nextState', nextState);
        if (nextProps.folder.refresh) {
            return true;
        }

        console.log('shouldComponentUpdate');
        // Don't update component in case of loading status.
        if (nextProps.folder.loading === true && this.props.folder.loading === true) {
            return false;
        }

        return nextProps.folder.open != this.props.folder.open ||
            nextProps.folder.loading != this.props.folder.loading ||
            this.props.folder.id == nextProps.selected ||
            this.props.folder.id == this.props.selected ||
            nextProps.folder.childIds != this.props.folder.childIds;
    }*/

    render() {
        const { name, childIds, open, loading } = this.props.folder;
        const { parentId, selected, id, styling } = this.props;
        // console.log('Render Tree: ', name);

        return (
            <React.Fragment>
                <ListItem selected={selected === id} style={styling} className={'folder-tree'} onClick={this.handleItemClick} button component={'div'}>
                    <ListItemIcon style={itemIconStyle}>
                        <FolderIcon className={'folder-icon'} viewBox='0 0 27 23' />
                    </ListItemIcon>

                    <ListItemText primary={
                        <Tooltip title={name}>
                            <Typography noWrap display={"block"} component="span">
                                {name}
                            </Typography>
                        </Tooltip>
                    } />

                    {
                        ((childIds === undefined && !loading) || (!open && !loading)) ?
                            (<PlusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        typeof childIds !== 'undefined' && childIds.length > 0 && !loading && open ?
                            (<MinusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        loading ? (<CircularProgress size={12} />) :('')
                    }
                </ListItem>

                {
                    typeof childIds !== 'undefined' && childIds.length > 0 && open ?
                        (
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {<List dense={true} component="div" disablePadding>
                                    {childIds.map(this.renderChild)}
                                </List>}
                            </Collapse>
                        ) :
                        ('')
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        folder: state.tree[ownProps.id],
        files: state.files,
        selected: state.selected,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addFolders,
    addFiles,
    addFilesToFolder,
    addChildren,
    setSelected,
    changeFolderStatus,
}, dispatch);


const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(Tree);

export default ConnectedTree
