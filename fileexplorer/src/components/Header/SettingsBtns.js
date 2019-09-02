import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Toolbar from "@material-ui/core/Toolbar";
import InfoIcon from '@material-ui/icons/Info';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import UploadIcon from '@material-ui/icons/CloudUpload';
import RenameIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewGridIcon from '@material-ui/icons/Apps';
import DeleteIcon from '@material-ui/icons/Delete';
import {bindActionCreators} from "redux";
import { changeViewMode } from "../../actions";
import axios from "axios";
import {hashFnv32a} from "../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    icon: {
        '&:hover': {
            color: '#006AFE',
        }
    },
});

class SettingsBtns extends Component {
    constructor(props) {
        super(props);

        this.changeView = this.changeView.bind(this);
    }

    changeView() {
        this.props.changeViewMode(!this.props.view);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.props.view ? (
                    <IconButton className={classes.icon} onClick={this.changeView} aria-label="Switch view">
                        <ViewGridIcon />
                    </IconButton>
                ) : (
                    <IconButton className={classes.icon} onClick={this.changeView} aria-label="Switch view">
                        <ViewListIcon />
                    </IconButton>
                )}
                <IconButton className={classes.icon} aria-label="Settings" disabled>
                    <SettingsIcon />
                </IconButton>
                <IconButton className={classes.icon} aria-label="File information" disabled>
                    <InfoIcon />
                </IconButton>
            </React.Fragment>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return  {
        view: state.view,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeViewMode,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsBtns));