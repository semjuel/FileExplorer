import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    showModal
} from "../../actions";
import Dialog from "@material-ui/core/Dialog";
import AddFolderForm from "../AddFolderForm/AddFolderForm";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.showModal(false);
    };

    render() {
        return (
            <Dialog open={this.props.modalStatus} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <AddFolderForm close={this.handleClose} />
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        modalStatus: state.modalStatus,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    showModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
