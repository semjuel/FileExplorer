import React, { Component } from 'react'
import {connect} from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Tree from "./Tree";
import ConnectedTree from "./Tree";

export class Children extends Component {
    renderChild = child => {
        const { level } = this.props;
        return (
            <ConnectedTree key={child.id} id={child.id} styling={Tree.getNestedStyle(level + 1)} />
        )
    };

    render() {
        console.log('Render: Children');
        const { children } = this.props;

        return (
            <React.Fragment>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    {<List dense={true} component="div" disablePadding>
                        {children.map(this.renderChild)}
                    </List>}
                </Collapse>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let children = [];
    ownProps.childIds.forEach((index) => {
        children.push(state.tree[index]);
    });

    // Sort by name.
    children.sort((a, b) => (a.name > b.name) ? 1 : -1);

    return  {
        children: children,
    };
}

export default  connect(mapStateToProps, null)(Children);
