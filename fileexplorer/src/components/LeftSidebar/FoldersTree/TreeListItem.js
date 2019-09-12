import React, {Component} from "react";
import { noop } from "../../../utils/utils";
import ClickResolver from "../../../hoc/ClickResolver";
import ListItem from "@material-ui/core/ListItem";
import FolderIcon from '@material-ui/icons/Folder'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SvgIcon from "@material-ui/core/SvgIcon";

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


export class ClickableItem extends Component {
    render() {
        console.log('render ClickableItem');
        const { classes, styling, selected } = this.props;
        const { id, name, status, childIds } = this.props.folder;

        return (
            <ListItem button component={'div'} style={styling} className={'folder-tree'}
                      onClick={this.props.onClick}
                      onDoubleClick={this.props.onDoubleClick}
                      selected={selected === id}
            >
                {/* className={classes.folderIcon}*/}
                <ListItemIcon className={classes.itemIcon}>
                    <FolderIcon className={'folder-icon'} />
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

                            <IconButton onClick={this.props.handlePlusClick}>
                                <PlusIcon  className={classes.moreIcon} viewBox='0 0 12 12' />
                            </IconButton>
                        ) :
                        ('')
                }

                {
                    status === 'open' && typeof childIds !== 'undefined' && childIds.length > 0 ?
                        (
                            <IconButton onClick={this.props.handleMinusClick}>
                                <MinusIcon className={classes.moreIcon} viewBox='0 0 12 12' />
                            </IconButton>
                        ) :
                        ('')
                }

                {
                    status === 'loading' ? (<CircularProgress className={classes.progress} size={12} />) :('')
                }
            </ListItem>
        );
    }
}

ClickableItem.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
};

const EnhancedClickableItem = ClickResolver(ClickableItem);

const TreeListItem = (props) => (
    <EnhancedClickableItem
        {...props}
    />
);

export default TreeListItem;
