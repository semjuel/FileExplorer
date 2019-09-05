import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import List from '@material-ui/core/List';

import { fetchFolderData } from "../../../actions";
import ConnectedTree from './Tree';

const itemStyle = {
    padding: '2px 22px',
};

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
        return (
            <Fragment>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    dense={true}
                >
                    <ConnectedTree id={0} styling={itemStyle} />
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

export default connect(null, mapDispatchToProps)(FoldersTree);
