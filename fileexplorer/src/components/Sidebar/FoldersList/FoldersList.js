import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { withStyles } from "@material-ui/core/styles"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { Markup } from "interweave";
import CircularProgress from '@material-ui/core/CircularProgress';

import FolderItem from "./FolderItem";
import { closeSnackbar, enqueueSnackbar, addFolder } from "../../../actions";
import {hashFnv32a} from "../../../services/hash";

const styles = theme => ({
    nothing: {
      fontStyle: 'italic',
    },
    center: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
});

class FoldersList extends Component {
    state = {
        folders: this.props.folders,
        loading: true,
    };

    componentDidMount() {
        let self = this;
        // @TODO add valid messages.
        // @TODO change request link.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0')
            .then(function (response) {
                self.setState({loading: false});
                let all = response.data.data;
                all.map(function (el) {
                    self.props.addFolder({
                        key: hashFnv32a(el.name) + Math.random(),
                        ...el
                    });
                });
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                self.setState({loading: false});
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
        const { classes, folders } = this.props;
        const loading = this.state.loading ? <CircularProgress /> : (<div className={classes.nothing}>No folders</div>);

        return (
            <Fragment>
                { typeof folders !== 'undefined' && folders.length > 0 ? (
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        dense={true}
                    >

                        {folders.map(el => (
                            <FolderItem name={el.name} key={el.key} />
                        ))}

                    </List>) : (<div className={classes.center}>{loading}</div>) }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { folders: state.tree.folders };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    addFolder,
}, dispatch);

FoldersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FoldersList));
