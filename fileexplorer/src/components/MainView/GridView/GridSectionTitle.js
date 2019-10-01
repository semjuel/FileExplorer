import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    headingWrapper: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
    },
    heading: {
        height: '56px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
    },
});


class GridSectionTitle extends Component {

    render() {
        const { classes, title } = this.props;
        return (
            <Grid item xs={9} className={classes.headingWrapper}>
                <Typography component="h6" variant="h6" className={classes.heading}>
                    <span>{title}</span>
                </Typography>
            </Grid>
        )
    }
}

export default (withStyles(styles)(GridSectionTitle));
