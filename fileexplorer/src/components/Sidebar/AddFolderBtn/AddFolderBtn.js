import React, {Component} from 'react';
import { withStyles} from "@material-ui/core";
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Button from "@material-ui/core/Button";

import Aux from '../../../hoc/Aux';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {showModal} from "../../../actions";

const styles = theme => ({
    button: {
        margin: theme.spacing(5, 3, 2),
        background: '#008CFE',
        textTransform: 'none',
        color: '#fff',
        '&:hover': {
            background: '#006AFE',
        },
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
});

class AddFolderBtn extends Component {
    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.props.showModal(true);
    };
        render() {
        const { classes } = this.props;

        return (
            <Aux>
                <Button size="large" variant="contained" className={classes.button} onClick={this.handleOpen}>
                    <NewFolderIcon className={classes.leftIcon} />
                    Add folder
                </Button>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showModal,
}, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddFolderBtn));
