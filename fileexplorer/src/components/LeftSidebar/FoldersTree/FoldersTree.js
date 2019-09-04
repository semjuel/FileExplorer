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

class FoldersTree extends Component {

    componentDidMount() {
        this.props.fetchFolderData(this.props.folder);
    }

    render() {
        console.log('Render: FoldersTree');
        const { classes } = this.props;

        return (
            <Fragment>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    dense={true}
                >
                    <TestTree folder={this.props.folder} id={0} className={classes.item}  />
                </List>
            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        folder: state.tree[0],
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchFolderData: (folder) => dispatch(fetchFolderData(folder))
    };
};

FoldersTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FoldersTree));
