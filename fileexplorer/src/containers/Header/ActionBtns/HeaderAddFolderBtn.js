import React, {Component} from 'react';
import AddFolderIcon from '@material-ui/icons/CreateNewFolder';
import IconButton from "@material-ui/core/IconButton";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {showModal} from "../../../actions";

class HeaderAddFolderBtn extends Component {

    render() {
        let {showModal, ...others} = this.props;

        return (
            <IconButton onClick={() => showModal(true)} {...others} aria-label="Add Folder">
                <AddFolderIcon />
            </IconButton>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showModal
}, dispatch);

export default connect(null, mapDispatchToProps)(HeaderAddFolderBtn);
