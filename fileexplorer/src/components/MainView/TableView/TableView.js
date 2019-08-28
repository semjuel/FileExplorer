import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import SvgIcon from "@material-ui/core/SvgIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Timestamp from "react-timestamp";
import filesize from "filesize";

const styles = theme => ({
    table: {
        minWidth: 750,
    },
    name: {
        width: '60%',
    }
});

/*@TODO move to icons container*/
const FolderIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M27 8L27 21C27 22.05 26.16 23 25 23L3 23C1.84 23 1 22.05 1 21L1 3C1 2.07 1.98 1 3 1L9 1C10.02 1 11 2.07 11 3L11 6L25 6C26.16 6 27 6.95 27 8Z"/>
    </SvgIcon>
);

class TableView extends Component {

    render() {
        console.log('Render TableView');
        const { classes, folders } = this.props;

        return (
            <React.Fragment>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'small'}
                >
                    {/*@TODO move TableHead ti another component*/}
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.name}>
                                Name
                            </TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Modified</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                            folders.map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell>
                                            <FolderIcon className={'folder-icon'} viewBox='0 0 27 23' />
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.type === 'directory' ? ("") : (filesize(row.size))}
                                        </TableCell>
                                        <TableCell>
                                            <Timestamp date={row.modified} />
                                        </TableCell>
                                        <TableCell>
                                            <Timestamp date={row.created} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                    }
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TableView);

