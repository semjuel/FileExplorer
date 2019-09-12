import React from 'react'
import { Component } from 'react'
import SvgIcon from "@material-ui/core/SvgIcon";
import {bindActionCreators} from "redux";
import {
    changeFolderStatus,
    fetchFolderData,
    setSelected,
} from "../../../actions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import TreeListItem from './TreeListItem';
import Children from "./Children";

// @TODO remove style.css
import "./style.css";

const styles = theme => ({
    listItem: {
        color: 'rgba(0, 0, 0, 0.65)',
        '&:hover': {
            color: '#222222',
        },
    },
    name: {
        padding: '2px 0',
    },
    progress: {
        padding: '12px',
    },
    moreIcon: {
        width: '12px',
        height: '12px',
    },
    itemIcon: {
        minWidth: '30px',
    },
    folderIcon: {
        fill: '#bbccd8',
        stroke: '#70818c',
        strokeWidth: '1.5px',
        width: '1.2em',
        height: '1.2em',
    },
});

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
        this.handlePlusClick = this.handlePlusClick.bind(this);
        this.handleMinusClick = this.handleMinusClick.bind(this);
        this.handleItemDoubleClick = this.handleItemDoubleClick.bind(this);
    }

    static getNestedStyle(level) {
        const p = 22 +  10 * level;
        return {
            paddingLeft: p + 'px',
            paddingRight: '22px',
            paddingTop: '2px',
            paddingBottom: '2px',
        };
    }

    handleItemClick() {
        const { folder } = this.props;
        if (typeof folder.childIds === 'undefined') {
            // Make request to get folder data.
            this.props.changeFolderStatus(folder.id, 'loading');
            this.props.fetchFolderData(folder);
        }

        // Make folder selected.
        this.props.setSelected(folder.id);
    }

    handleItemDoubleClick() {
        const { folder } = this.props;
        if (folder.status === 'open') {
            this.props.changeFolderStatus(this.props.folder.id, 'close');
        }
        else if (folder.status === 'close') {
            if (typeof folder.childIds === 'undefined') {
                // Make request to get folder data.
                this.props.changeFolderStatus(folder.id, 'loading');
                this.props.fetchFolderData(folder);
            }
            else if (folder.childIds.length > 0) {
                this.props.changeFolderStatus(folder.id, 'open');
            }
        }
    }

    handlePlusClick(e) {
        e.stopPropagation();

        const { folder } = this.props;

        if (typeof folder.childIds === 'undefined') {
            // Make request to get folder data.
            this.props.changeFolderStatus(folder.id, 'loading');
            this.props.fetchFolderData(folder);
        }
        else if (folder.childIds.length > 0 && folder.status === 'close') {
            this.props.changeFolderStatus(folder.id, 'open');
        }
    }

    handleMinusClick(e) {
        e.stopPropagation();
        this.props.changeFolderStatus(this.props.folder.id, 'close');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const changeSeleceted = nextProps.folder.id === nextProps.selected ||
            this.props.folder.id === this.props.selected;

        const statusChanged = nextProps.folder.status !== this.props.folder.status;

        return changeSeleceted || statusChanged;
    }

    render() {
        const { classes, styling, selected, tree } = this.props;
        const { id, name, status, childIds, level } = this.props.folder;

        console.log('Render Tree: ', name);

        return (
            <React.Fragment>
                <TreeListItem {...this.props}
                    onClick={this.handleItemClick}
                    onDoubleClick={this.handleItemDoubleClick}
                    handleMinusClick={this.handleMinusClick}
                    handlePlusClick={this.handlePlusClick}
                />

                {
                    typeof childIds !== 'undefined' && childIds.length > 0 && status === 'open' ?
                        <Children level={level} childIds={childIds} /> :
                        ('')
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return  {
        folder: state.tree[ownProps.id],
        selected: state.selected,
        tree: state.tree,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeFolderStatus,
    fetchFolderData,
    setSelected,
}, dispatch);

const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tree));

export default ConnectedTree