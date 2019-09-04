import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";
import List from '@material-ui/core/List';

import { fetchFolderData } from "../../../actions";
import TestTree from './TestTree';

const styles = theme => ({
    item: {
        padding: '2px 22px',
    }
});

// @TODO move this to configs.
const rootFolder = {
    id: 0,
    name: 'root',
    level: 0,
    path: '/',
    type: 'directory',

    // @TODO statuses to a constant.
    // Add status property - possible values are: loading, open, close, refresh.
    status: 'loading',
};

class FoldersTree extends Component {

    componentDidMount() {
        this.props.fetchFolderData(rootFolder);
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
                    <TestTree id={0} className={classes.item}  />
                </List>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFolderData: (folder) => dispatch(fetchFolderData(folder))
    };
};

FoldersTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(FoldersTree));
