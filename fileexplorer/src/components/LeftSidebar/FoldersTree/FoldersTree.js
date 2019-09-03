import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { withStyles } from "@material-ui/core/styles"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { Markup } from "interweave";

import { closeSnackbar, enqueueSnackbar, addChildren, addFolders, changeFolderStatus } from "../../../actions";
import {hashFnv32a} from "../../../services/hash";
import Tree from './Tree';

const styles = theme => ({
    item: {
        padding: '2px 22px',
    }
});

class FoldersTree extends Component {

    componentDidMount() {
        let self = this;
        // @TODO add valid messages.
        // @TODO change request link.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory1&depth=0')
            .then(function (response) {
                let data = response.data.data;
                let childIds = [], children = [];
                data.map(function (el) {
                    el.id = hashFnv32a(el.path + el.name);
                    el.level = 1;
                    childIds.push(el.id);
                    children[el.id] = el;
                });
                self.props.addChildren(0, childIds);
                self.props.addFolders(children);
                self.props.changeFolderStatus(0, true, false);
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
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    dense={true}
                >
                    <Tree id={0} loading={true} open={false} className={classes.item}  />
                </List>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { tree: state.tree };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addChildren,
    addFolders,
    changeFolderStatus,
}, dispatch);

FoldersTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FoldersTree));
