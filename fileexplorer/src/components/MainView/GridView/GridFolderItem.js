import React, {Component} from "react";

import {noop} from "../../../utils/utils";
import ClickResolver from "../../../hoc/ClickResolver";
import Grid from "@material-ui/core/Grid";
import FolderIcon from '@material-ui/icons/Folder'
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

export class ClickableFolderItem extends Component {
    render() {

        const { index, classes, child, showTooltip } = this.props;
        console.log('render ClickableFolderItem', index);
        return (
            <Grid item xs={2} className={classes.grid}>
                <ButtonBase
                    onClick={()=>this.props.onClick(index)}
                    onDoubleClick={()=>this.props.onDoubleClick(index)}
                    focusRipple
                    key={child.id}
                    className={classes.btn}
                    focusVisibleClassName={classes.focusVisible}
                >
                    <span className={classes.backdrop} />
                    <span className={classes.iconWrap}>
                        <FolderIcon className={classes.folderIcon} />
                    </span>
                    <span className={classes.name}>
                        {
                            showTooltip
                                ? <Tooltip title={child.name}>
                                    <Typography noWrap display={"block"} component="span">
                                        {child.name}
                                    </Typography>
                                </Tooltip>
                                : <Typography noWrap display={"block"} component="span">
                                    {child.name}
                                </Typography>
                        }

                    </span>
                </ButtonBase>
            </Grid>
        );
    }
}

ClickableFolderItem.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
};

const EnhancedClickableItem = ClickResolver(ClickableFolderItem);

const GridFolderItem = (props) => (
    <EnhancedClickableItem
        {...props}
    />
);

export default GridFolderItem;
