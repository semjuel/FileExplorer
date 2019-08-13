import React, { Component } from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import SvgIcon from '@material-ui/core/SvgIcon';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {hashFnv32a} from "../../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";
import { closeSnackbar, enqueueSnackbar, setSelected } from "../../../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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

class FolderItem extends Component {
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.getNestedStyle = this.getNestedStyle.bind(this);
    }

    state = {
        element: this.props.element,
        loading: false,
        open: false,
    };

    getNestedStyle(level) {
        const p = 22 +  10 * level;
        return {
            paddingLeft: p + 'px',
            paddingRight: '22px',
        };
    }

/*    shouldComponentUpdate(nextProps, nextState, nextContext) {
// @TODO update component only if necessary.
        console.log(this.state.tree);
    }*/

    handleItemClick() {
        if (this.state.loading) {
            return;
        }
        console.log(this.props);

        this.props.setSelected(this.state.element);

        // In case element has children - don't make request, just collapse children block.
        if (typeof this.state.element.children !== 'undefined' && this.state.element.children.length > 0) {
            this.setState({
                open: !this.state.open,
            });

            return;
        }

        let self = this;
        this.setState({
            loading: true,
        });

        const path = this.state.element.path;

        // @TODO implement this.
        // Make request.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0&path=' + path)
            .then(function (response) {
                let all = response.data.data;
                all.map(function (el) {
                    el.key = hashFnv32a(el.name) + Math.random();
                    el.level = self.state.element.level + 1;
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
                self.setState({
                    loading: false,
                    open: true
                });
            });
    }

/*    componentDidUpdate(prevProps, prevState, snapshot) {
        // @TODO implement this.
    }*/

    render() {
        const { element, styling, selectedIndex } = this.props;

        // @TODO change this.
        const sIndex = this.props.selected && typeof this.props.selected.key !== 'undefined' ? this.props.selected.key : '';

        // @TODO how to handle selected item.
        //console.log('selectedIndex = ' + selectedIndex);
        //console.log('key = ' + element.key);
        console.log('name = ' + element.name);
        return (
            <React.Fragment>
                <ListItem selected={sIndex === element.key} style={styling} className={'folder-tree'} onClick={this.handleItemClick} button>
                    <ListItemIcon style={itemIconStyle}>
                        <FolderIcon className={'folder-icon'} viewBox='0 0 27 23' />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Tooltip title={element.name}>
                            <Typography noWrap display={"block"} component="span">
                                {element.name}
                            </Typography>
                        </Tooltip>
                    } />

                    {
                        ((element.children === undefined && !this.state.loading) || (!this.state.open && !this.state.loading)) ?
                            (<PlusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        typeof element.children !== 'undefined' && element.children.length > 0 && !this.state.loading && this.state.open ?
                            (<MinusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        this.state.loading ? (<CircularProgress size={12} />) :('')
                    }
                </ListItem>

                {
                    typeof element.children !== 'undefined' && element.children.length > 0 ?
                        (
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                {<List dense={true} component="div" disablePadding>
                                    {element.children.map(el => (
                                        <FolderItemWrapper styling={this.getNestedStyle(el.level)} element={el} key={el.key} />
                                    ))}
                                </List>}
                            </Collapse>
                        ) :
                        ('')
                }
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        folders: state.tree.folders,
        selected: state.selected.selected,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    setSelected,
}, dispatch);

const FolderItemWrapper = connect(mapStateToProps, mapDispatchToProps)(FolderItem);

export default FolderItemWrapper;
