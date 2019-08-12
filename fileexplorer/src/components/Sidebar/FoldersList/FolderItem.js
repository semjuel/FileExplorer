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
import SvgIcon from '@material-ui/core/SvgIcon';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {hashFnv32a} from "../../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";
import { closeSnackbar, enqueueSnackbar, addFolder, addFolders } from "../../../actions";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles = theme => ({
    itemIcon: {
        minWidth: '30px',
    },
    content: {
        padding: '0 ' + theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    moreIcon: {
        width: '12px',
        height: '12px',
    },
});

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

class FolderItem extends Component {
    constructor(props) {
        super(props);

        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    state = {
        element: this.props.element,
        loading: false,
        open: false,
    };

    handleItemClick() {
        if (this.state.loading) {
            return;
        }



        let self = this;
        this.setState({
            loading: true,
        });

        console.log(this.state.element);
        const path = this.state.element.path;

        // @TODO implement this.
        // Make request.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0&path=' + path)
            .then(function (response) {
                let all = response.data.data;
                all.map(function (el) {
                    el.key = hashFnv32a(el.name) + Math.random();
                });

                self.state.element.children = all;
                // @TODO add children to the folder.
                self.setState({
                    element: self.state.element
                });
                // self.props.addFolders(all);
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
                // always executed
                self.setState({loading: false});
            });
    }

    render() {
        const { element, classes } = this.props;
        console.log(classes);

        return (
            <React.Fragment>
                <ListItem  onClick={this.handleItemClick}  className={classes.content} button>
                    <ListItemIcon className={classes.itemIcon}>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Tooltip title={element.name}>
                            <Typography noWrap display={"block"} component="span">
                                {element.name}
                            </Typography>
                        </Tooltip>
                    } />

                    {
                        element.children === undefined && !this.state.loading ?
                            (<PlusIcon className={classes.moreIcon} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        typeof element.children !== 'undefined' && element.children.length > 0 && !this.state.loading ?
                            (<MinusIcon className={classes.moreIcon} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        this.state.loading ? (<CircularProgress size={12} />) :('')
                    }
                </ListItem>

                {
                    typeof element.children !== 'undefined' && element.children.length > 0 ?
                        (
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List dense={true} component="div" disablePadding>
                                    {element.children.map(el => (
                                        <FolderItem element={el} key={el.key} className={classes.nested} classes={classes} />
                                    ))}
                                </List>
                                {/*<List dense={true} component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />

                                    </ListItem>
                                </List>*/}
                            </Collapse>
                        ) :
                        ('')
                }
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return { folders: state.tree.folders };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addFolder,
    addFolders,
}, dispatch);

// FolderItem.propTypes = {
//     classes: PropTypes.object.isRequired,
// };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FolderItem));
