import React, { Component } from 'react';
import axios from 'axios'
import {Markup} from "interweave";
import {closeSnackbar, enqueueSnackbar} from "../../../actions";
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';

class FoldersList extends React.Component {
    handleClick = () => {

        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on,
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of number or characters, but it has to be unique to a given snackbar.
        this.props.enqueueSnackbar({
            message: 'Failed fetching data.',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'warning',
                action: key => (
                    <Button onClick={() => this.props.closeSnackbar(key)}>dissmiss me</Button>
                ),
            },
        });
    };

    componentDidMount() {
        const position = {
            vertical: 'top',
            horizontal: 'right',
        };
        let self = this;
        // @TODO add valid messages.
        axios.get('http://localhost:9195/admin/file-explorer/entry')
            .then(function (response) {
                console.log(response);
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                console.log(error);
                let msg = 'Can\'t create a folder.';
                // if (error.response && error.response.data) {
                //     msg = msg + ' ' + error.response.data.message;
                // }

                console.log('HEre');
                self.props.enqueueSnackbar(<Markup content={msg} />, {variant: 'error', anchorOrigin: position,})
                self.props.enqueueSnackbar({
                    message: 'Failed fetching data.',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'warning',
                        action: key => (
                            <Button onClick={() => self.props.closeSnackbar(key)}>dissmiss me</Button>
                        ),
                    },
                });
            });
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                Folder list will be here ...
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
}, dispatch);


export default connect(null, mapDispatchToProps)(FoldersList);
