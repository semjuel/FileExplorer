import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder'
import ButtonBase from '@material-ui/core/ButtonBase';
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core";


const styles = theme => ({
    grid: {

    },
    folderIcon: {
        height: '3em',
        width: '3em',
        fill: '#bbccd8',
        stroke: '#70818c',
        strokeWidth: '0.4px',
    },
    folderName: {

    },
    btn: {
        width: '100%',
    },

    image: {
        position: 'relative',
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $backdrop': {
                opacity: 1,
                backgroundColor: '#D3E5EE',
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#D3E5EE',
        opacity: 0,
        transition: theme.transitions.create('opacity'),
        zIndex: '-1',
        borderRadius: '7px',
    },
});

class GridView extends Component {

    renderChild = child => {
        const { classes } = this.props;
        return (
            <Grid item xs={2} className={classes.grid}>
                <ButtonBase
                    focusRipple
                    key={child.name}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: '100%',
                    }}
                >
                    <span className={classes.backdrop} />
                    <FolderIcon className={classes.folderIcon} />
                    <div className={classes.folderName}>
                        {child.name}
                    </div>
                </ButtonBase>

            </Grid>
        )
    }

    render() {
        const { children } = this.props;

        return (
            <React.Fragment>
                <Typography component="h6" variant="h6">
                    Folders
                </Typography>
                <Divider />
                <Grid container spacing={3}
                      alignItems="center">
                    {
                        children.map(this.renderChild)
                    }
                </Grid>

                <Typography component="h6" variant="h6">
                    Files
                </Typography>
                <Divider />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let children = [];
    const childIds = state.tree[state.selected].childIds;

    if (typeof childIds !== 'undefined' && childIds.length > 0) {
        childIds.forEach((index) => {
            children.push(state.tree[index]);
        });

        // Sort by name.
        children.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    return  {
        children: children,
    };
}

export default connect(mapStateToProps, null)(withStyles(styles)(GridView));
