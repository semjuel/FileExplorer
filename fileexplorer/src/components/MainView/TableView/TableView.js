import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import SvgIcon from "@material-ui/core/SvgIcon";
import FileIcon from '@material-ui/icons/FileCopy';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from "@material-ui/core/Checkbox";
import Timestamp from "react-timestamp";
import filesize from "filesize";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

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

const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
    { id: 'modified', numeric: true, disablePadding: false, label: 'Modified' },
    { id: 'created', numeric: true, disablePadding: false, label: 'Created' },
];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


class TableView extends Component {
    constructor(props) {
        super(props);

        this.tableHead = this.tableHead.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.stableSort = this.stableSort.bind(this);
        this.getSorting = this.getSorting.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    state = {
        order: 'asc',
        orderBy: 'name',
        page: 0,
        rowsPerPage: 15,
        selected: [],
    };

    setOrder(order) {
        this.setState({order: order})
    }
    setOrderBy(by) {
        this.setState({orderBy: by})
    }

    tableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = property => event => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headRows.map(row => (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? 'right' : 'left'}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={createSortHandler(row.id)}
                            >
                                {row.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    handleRequestSort(event, property) {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setOrder(isDesc ? 'asc' : 'desc');
        this.setOrderBy(property);
    }

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    handleChangePage(event, newPage) {
        this.setState({page: newPage});
    }

    render() {
        console.log('Render TableView');
        const { classes, folders, files } = this.props;
        const { order, orderBy, page, rowsPerPage } = this.state;

        return (
            <React.Fragment>
                <TablePagination
                    component="div"
                    count={files.length + folders.length}
                    rowsPerPage={15}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={this.handleChangePage}
                />
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'small'}
                >
                    {/*@TODO move TableHead to another component*/}
                    {this.tableHead({order: this.state.order, orderBy: this.state.orderBy, onRequestSort: this.handleRequestSort})}
                    <TableBody>
                    {
                        this.stableSort(folders, this.getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
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
                                            {row.type === 'directory' ? (row.size) : (filesize(row.size))}
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
                        {
                            this.stableSort(files, this.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell>
                                            <FileIcon className={'folder-icon'} viewBox='0 0 27 23' />
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.type === 'directory' ? (row.size) : (filesize(row.size))}
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

