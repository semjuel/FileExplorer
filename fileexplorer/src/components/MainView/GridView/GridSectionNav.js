import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";

const styles = theme => ({
    headingWrapper: {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
    },
});

class GridSectionNav extends Component {

    render() {
        const { classes, length, currentPage, handleOnChange } = this.props;

        return (
            <Grid item xs={3} className={classes.headingWrapper}>
                <TablePagination
                    component="div"
                    count={length}
                    rowsPerPage={25}
                    rowsPerPageOptions={[0]}
                    page={currentPage}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleOnChange}
                />
            </Grid>
        )
    }
}

export default (withStyles(styles)(GridSectionNav));
