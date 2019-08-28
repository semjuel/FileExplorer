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
        let folders = [];
        const self = this;
        const folder = this.props.folders[this.props.selected];
        if (typeof folder.childIds !== 'undefined' && folder && folder.childIds.length > 0) {
            folder.childIds.map(function(index){
                if (self.props.folders[index]) {
                    folders.push(self.props.folders[index]);
                }
            });
        }

        return folders;
    }

    renderView(folders) {
        return (
            this.props.view ? (
                    <TableView folders={folders} />
                ) : (
                    <div>
                        <TableView folders={folders} />
                        {/*<GridView />*/}
                    </div>
                )
        );
    }

    render() {
        const folders = this.getFolders();

        return (
            <React.Fragment>
                { folders.length > 0 ? (this.renderView(folders)) : ("empty")}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        view: state.view,
        folders: state.tree,
        selected: state.selected,
    };
}

export default connect(mapStateToProps, null)(MainView);
