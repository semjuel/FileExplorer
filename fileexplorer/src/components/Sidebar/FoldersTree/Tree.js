import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {bindActionCreators} from "redux";
import {setSelected} from "../../../actions";

const itemIconStyle = {
    minWidth: '30px',
};

const moreIconStyle = {
    width: '12px',
    height: '12px',
};

const FolderIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M27 8L27 21C27 22.05 26.16 23 25 23L3 23C1.84 23 1 22.05 1 21L1 3C1 2.07 1.98 1 3 1L9 1C10.02 1 11 2.07 11 3L11 6L25 6C26.16 6 27 6.95 27 8Z"/>
    </SvgIcon>
);

const PlusIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M1 6L12 6L12 7L1 7L1 6Z"/>
        <path d="M6 1L7 1L7 12L6 12L6 1Z"/>
    </SvgIcon>
);

const MinusIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M1 6L12 6L12 7L1 7L1 6Z"/>
    </SvgIcon>
);

export class Tree extends Component {
    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    state = {
        element: this.props.element,
        open: false,
    };

    static getNestedStyle(level) {
        const p = 22 +  10 * level;
        return {
            paddingLeft: p + 'px',
            paddingRight: '22px',
        };
    }

    renderChild = childId => {
        const { id, level } = this.props;
        return (
            <ConnectedTree key={childId} id={childId} styling={Tree.getNestedStyle(level)}  parentId={id} />
        )
    };

    handleItemClick() {
        if (this.props.loading) {
            return;
        }

        console.log(this.props);
        this.props.setSelected(this.props.id);
        console.log('Click');
    }

    render() {
        const { name, parentId, childIds, styling } = this.props;
        console.log(name);
        //console.log(this.props);
        return (
            <React.Fragment>
                <ListItem style={styling} onClick={this.handleItemClick} button>
                    <ListItemIcon style={itemIconStyle}>
                        <FolderIcon className={'folder-icon'} viewBox='0 0 27 23' />
                    </ListItemIcon>

                    <ListItemText primary={
                        <Tooltip title={name}>
                            <Typography noWrap display={"block"} component="span">
                                {name}
                            </Typography>
                        </Tooltip>
                    } />

                    {
                        ((childIds === undefined && !this.props.loading) || (!this.state.open && !this.props.loading)) ?
                            (<PlusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        typeof childIds !== 'undefined' && childIds.length > 0 && !this.props.loading && this.state.open ?
                            (<MinusIcon style={moreIconStyle} viewBox='0 0 12 12' />) :
                            ('')
                    }

                    {
                        this.props.loading ? (<CircularProgress size={12} />) :('')
                    }
                </ListItem>

                {
                    typeof childIds !== 'undefined' && childIds.length > 0 ?
                        (
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                {<List dense={true} component="div" disablePadding>
                                    {childIds.map(this.renderChild)}
                                </List>}
                            </Collapse>
                        ) :
                        ('')
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return state.tree[ownProps.id]
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelected,
}, dispatch);


const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(Tree);

export default ConnectedTree
