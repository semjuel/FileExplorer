import React, {Component} from 'react';
import {connect} from "react-redux";

import TableView from "./TableView/TableView";
import GridView from "./GridView/GridView";

class MainView extends Component {
    constructor(props) {
        super(props);

        this.getFolders = this.getFolders.bind(this);
        this.renderView = this.renderView.bind(this);
    }

    getFolders() {
        // @TODO find a better way.
        let folders = [], files = [];
        const self = this;

        const folder = this.props.folders[this.props.selected];
        if (typeof folder.childIds !== 'undefined' && folder && folder.childIds.length > 0) {
            folder.childIds.map(function(index) {
                if (self.props.folders[index]) {
                    folders.push(self.props.folders[index]);
                }
            });
        }

        if (typeof folder.fileIds !== 'undefined' && folder && folder.fileIds.length > 0) {
            folder.fileIds.map(function(index) {
                if (self.props.files[index]) {
                    files.push(self.props.files[index]);
                }
            });
        }

        return {folders, files};
    }

    renderView(folders, files) {
        return (
            this.props.view ? (
                    <TableView folders={folders} files={files} />
                ) : (
                    <div>
                        <TableView folders={folders} files={files} />
                        {/*<GridView />*/}
                    </div>
                )
        );
    }

    render() {
        const {folders, files} = this.getFolders();

        return (
            <React.Fragment>
               { folders.length > 0 || files.length > 0 ? (this.renderView(folders, files)) : ("empty")}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        view: state.view,
        folders: state.tree,
        files: state.files,
        selected: state.selected,
    };
}

export default connect(mapStateToProps, null)(MainView);
