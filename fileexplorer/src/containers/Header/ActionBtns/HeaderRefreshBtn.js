import React, {Component} from 'react';
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {hashFnv32a} from "../../../services/hash";
import {Markup} from "interweave";
import Button from "@material-ui/core/Button";

class HeaderRefreshBtn extends Component {

    handleRefresh() {
        // @TODO rewrite this logic.
        /*
        let self = this;
        // @TODO move this to the service.
        if (this.props.folder.loading) {
            return;
        }

        this.props.refreshFolder(this.props.folder.id, true);

        // Remove folders from state.
        this.props.folder.childIds.forEach(function (id) {
            console.log(id);
            self.props.deleteFolder(id);
        });
        // self.props.changeFolderStatus(self.props.folder.id, true, false);
        console.log('Tree', this.props.tree);
        // Remove children.
        this.props.removeChildren(this.props.folder.id);
        console.log(this.props.folder);


        const path = this.props.folder.path;
        // Make request.
        axios.get('http://localhost:9195/admin/file-explorer/entry?mode=directory&depth=0&path=' + path)
            .then(function (response) {
                let data = response.data.data;
                let childIds = [], children = [];
                data.map(function (el) {
                    el.id = hashFnv32a(el.path + el.name);
                    el.level = self.props.folder.level + 1;
                    childIds.push(el.id);
                    children[el.id] = el;
                });

                console.log(children);

                self.props.addFolders(children);
                self.props.addChildren(self.props.folder.id, childIds);

                self.props.changeFolderStatus(self.props.folder.id, true, false);
            })
            // @TODO handle this correctly.
            .catch(function (error) {
                console.log(error);
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

                self.props.changeFolderStatus(self.props.folder.id, true, false);
            });*/
    };

    render() {
        return (
            <IconButton {...this.props} onClick={this.handleRefresh} aria-label="Refresh">
                <RefreshIcon/>
            </IconButton>
        );
    }
}

export default HeaderRefreshBtn;
