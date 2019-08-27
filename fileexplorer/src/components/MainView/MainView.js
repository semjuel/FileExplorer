import React, {Component} from 'react';
import {connect} from "react-redux";

import TableView from "./TableView/TableView";
import GridView from "./GridView/GridView";

class MainView extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.view ? (
                    <TableView />
                ) : (
                    <GridView />
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        view: state.view,
    };
}

export default connect(mapStateToProps, null)(MainView);
