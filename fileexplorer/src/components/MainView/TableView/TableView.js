import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    icon: {
        '&:hover': {
            color: '#006AFE',
        }
    },
});

class TableView extends Component {

    render() {
        return (
            <React.Fragment>
                TableView
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TableView);

