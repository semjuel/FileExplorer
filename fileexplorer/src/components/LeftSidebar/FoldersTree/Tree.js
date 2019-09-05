import React from 'react'
import { Component } from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from '@material-ui/icons/Folder';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {bindActionCreators} from "redux";
import {
    changeFolderStatus,
    fetchFolderData,
    setSelected,
} from "../../../actions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";

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
            this.handleMinusClick();
        }
        else if (folder.status === 'close') {
            this.handlePlusClick();
        }
    }

    handlePlusClick() {
        const { folder } = this.props;
        if (typeof folder.childIds === 'undefined') {
            // Make request to get folder data.
            this.props.changeFolderStatus(folder.id, 'loading');
            this.props.fetchFolderData(folder);
        }
        else if (folder.status === 'open' && folder.childIds.length > 0) {
            this.props.changeFolderStatus(folder.id, 'close');
        }
    }

    handleMinusClick() {
        this.props.changeFolderStatus(this.props.folder.id, 'close');
    }

    renderChild = childId => {
        const { level } = this.props.folder;
        return (
            <ConnectedTree key={childId} id={childId} styling={Tree.getNestedStyle(level + 1)} />
        )
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.folder.id === nextProps.selected ||
        this.props.folder.id === this.props.selected;
    }

    render() {
        const { classes, styling, selected } = this.props;
        const { id, name, status, childIds } = this.props.folder;

        console.log('Render Tree: ', name);

        return (
            <React.Fragment>
                <ListItem button component={'div'} style={styling} className={'folder-tree'}
                          onClick={this.handleItemClick}
                          onDoubleClick={this.handleItemDoubleClick}
                          selected={selected === id}
                >
                    <ListItemIcon className={classes.itemIcon}>
                        <FolderIcon className={'folder-icon'} /> {/* className={classes.folderIcon}*/}
                    </ListItemIcon>

                    <ListItemText primary={
                        <Tooltip title={name}>
                            <Typography noWrap display={"block"} className={classes.name} component="span">
                                {name}
                            </Typography>
                        </Tooltip>
                    } />

                    {
                        status === 'close' ?
                            (

                                <IconButton onClick={this.handlePlusClick}>
                                    <PlusIcon  className={classes.moreIcon} viewBox='0 0 12 12' />
                                </IconButton>
                            ) :
                            ('')
                    }

                    {
                        status === 'open' && typeof childIds !== 'undefined' && childIds.length > 0 ?
                            (
                                <IconButton onClick={this.handleMinusClick}>
                                    <MinusIcon className={classes.moreIcon} viewBox='0 0 12 12' />
                                </IconButton>
                            ) :
                            ('')
                    }

                    {
                        status === 'loading' ? (<CircularProgress className={classes.progress} size={12} />) :('')
                    }
                </ListItem>

                {
                    typeof childIds !== 'undefined' && childIds.length > 0 && status === 'open' ?
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
    return  {
        folder: state.tree[ownProps.id],
        selected: state.selected,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeFolderStatus,
    fetchFolderData,
    setSelected,
}, dispatch);

const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tree));

export default ConnectedTree