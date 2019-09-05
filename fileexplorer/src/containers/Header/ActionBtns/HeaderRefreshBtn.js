import React, {Component} from 'react';
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeFolderStatus, fetchFolderData, deleteFolder, removeChildren} from "../../../actions";

class HeaderRefreshBtn extends Component {
    constructor(props) {
        super(props);

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        const { folder } = this.props;
        const self = this;

        if (folder.status === 'loading') {
            return;
        }

        if (this.props.status === 'open') {
            this.props.changeFolderStatus(folder.id, 'close');
        }

        this.props.changeFolderStatus(folder.id, 'loading');

        // Remove folders from state.
        folder.childIds.forEach(function (id) {
            self.props.deleteFolder(id);
        });

        // Remove children.
        this.props.removeChildren(folder.id);

        this.props.fetchFolderData(folder);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.folder.id === nextProps.selected;
    }

    render() {
        return (
            <IconButton {...this.props} onClick={this.handleRefresh} aria-label="Refresh">
                <RefreshIcon/>
            </IconButton>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        folder: state.tree[state.selected],
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeFolderStatus,
    fetchFolderData,
    deleteFolder,
    removeChildren,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRefreshBtn);
