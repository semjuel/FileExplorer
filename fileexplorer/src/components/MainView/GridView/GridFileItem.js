import React, {Component} from "react";

import {noop} from "../../../utils/utils";
import ClickResolver from "../../../hoc/ClickResolver";
import Grid from "@material-ui/core/Grid";
import FileIcon from '@material-ui/icons/FileCopy';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

export class ClickableFileItem extends Component {
    render() {
        const activeStyle = {background: 'black'};
        const { index, classes, child, showTooltip, activeIndex } = this.props;
        console.log('render ClickableFileItem', index);
        return (
            <Grid item xs={2} className={classes.grid}>
                <ButtonBase
                    onClick={()=>this.props.onClick(index)}
                    onDoubleClick={()=>this.props.onDoubleClick(index)}
                    focusRipple
                    key={child.id}
                    className={classes.btn}
                    focusVisibleClassName={classes.focusVisible}
                    style={index === activeIndex ? activeStyle : null}
                >
                    <span className={classes.backdrop} />
                    <span className={classes.iconWrap}>
                        {
                            child.link ?
                                <img width={50} height={50} alt={''} src={child.link} /> :
                                <FileIcon className={classes.folderIcon} />
                        }
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

ClickableFileItem.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
};

const EnhancedClickableItem = ClickResolver(ClickableFileItem);

const GridFileItem = (props) => (
    <EnhancedClickableItem
        {...props}
    />
);

export default GridFileItem;
