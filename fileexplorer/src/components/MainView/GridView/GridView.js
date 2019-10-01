import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core";
import GridFolderItem from "./GridFolderItem";
import GridFileItem from "./GridFileItem";
import GridSectionTitle from "./GridSectionTitle";
import GridSectionNav from "./GridSectionNav";
import {bindActionCreators} from "redux";
import {changeFolderStatus, fetchFolderData, setSelected} from "../../../actions";

const styles = theme => ({
    grid: {

    },
    iconWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    folderIcon: {
        height: '3em',
        width: '3em',
        fill: '#bbccd8',
        stroke: '#70818c',
        strokeWidth: '0.4px',
    },
    btn: {
        position: 'relative',
        width: '100%',
        height: '9em',
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
            '& $folderIcon': {
                stroke: '#222222',
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
    name: {
        position: 'absolute',
        left: '0.5em',
        right: '0.5em',
        height: '3.5em',
        bottom: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class GridView extends Component {
    constructor(props) {
        super(props);

        this.handleFolderClick = this.handleFolderClick.bind(this);
        this.handleFolderDoubleClick = this.handleFolderDoubleClick.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
        this.handleFileDoubleClick = this.handleFileDoubleClick.bind(this);
        this.handleChangeFolderPage = this.handleChangeFolderPage.bind(this);
        this.handleChangeFilePage = this.handleChangeFilePage.bind(this);
    }

    state = {
        folderPage: 0,
        filePage: 0,
        rowsPerPage: 25,
        activeIndex: null,
        activeType: null,
    };


    handleFolderClick(id) {
        this.setState({
            activeIndex: id,
            activeType: 'folder',
        });
    }

    handleFolderDoubleClick(id) {
        const folder = this.props.folders[id];
        if (typeof folder.childIds === 'undefined') {
            // Make request to get folder data.
            this.props.changeFolderStatus(folder.id, 'loading');
            this.props.fetchFolderData(folder);
        }

        // Make folder selected.
        this.props.setSelected(folder.id);
    }

    handleFileClick(id) {
        this.setState({
            activeIndex: id,
            activeType: 'file',
        });
    }

    handleFileDoubleClick(id) {
        console.log('handleFileDoubleClick');
    }

    handleChangeFolderPage(event, newPage) {
        this.setState({folderPage: newPage});
    }

    handleChangeFilePage(event, newPage) {
        this.setState({filePage: newPage});
    }

    renderFolder = (folder, index) => {
        const { activeIndex, activeType } = this.state;
        const { classes } = this.props;
        const showTooltip = (folder.name.length > 30);

        return (
            <GridFolderItem
                key={index}
                index={index}
                classes={classes}
                onClick={this.handleFolderClick}
                onDoubleClick={this.handleFolderDoubleClick}
                child={folder}
                showTooltip={showTooltip}
                activeIndex={activeType === 'file' ? null : activeIndex}
            />
        )
    };

    renderFile = (file, index) => {
        const { activeIndex, activeType } = this.state;
        const { classes } = this.props;
        const showTooltip = (file.name.length > 30);

        return (
            <GridFileItem
                key={index}
                index={index}
                classes={classes}
                onClick={this.handleFileClick}
                onDoubleClick={this.handleFileDoubleClick}
                child={file}
                showTooltip={showTooltip}
                activeIndex={activeType === 'folder' ? null : activeIndex}
            />
        )
    };

    render() {
        const { folders, files, classes } = this.props;
        const { filePage, folderPage, rowsPerPage } = this.state;

        return (
            <React.Fragment>
                {
                    folders.length > 0 ? (
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <GridSectionTitle title={'Folders'} />

                                <GridSectionNav length={folders.length}
                                                currentPage={folderPage}
                                                handleOnChange={this.handleChangeFolderPage}
                                />

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}
                                  alignItems="center">
                                {
                                    folders
                                        .slice(folderPage * rowsPerPage, folderPage * rowsPerPage + rowsPerPage)
                                        .map(this.renderFolder)
                                }
                            </Grid>
                        </React.Fragment>
                    ) : ('')
                }

                {
                    files.length > 0 ? (
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <GridSectionTitle title={'Files'} />

                                <GridSectionNav length={files.length}
                                                currentPage={filePage}
                                                handleOnChange={this.handleChangeFilePage}
                                />

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}
                                  alignItems="center">
                                {
                                    files
                                        .slice(filePage * rowsPerPage, filePage * rowsPerPage + rowsPerPage)
                                        .map(this.renderFile)
                                }
                            </Grid>
                        </React.Fragment>
                    ) : ('')
                }
            </React.Fragment>

        );
    }
}

function mapStateToProps(state, ownProps) {
    let folders = [], files = [];
    const folder = state.tree[state.selected];
    const childIds = folder.childIds;

    if (typeof childIds !== 'undefined' && childIds.length > 0) {
        childIds.forEach((index) => {
            folders.push(state.tree[index]);
        });

        // Sort by name.
        folders.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    if (typeof folder.fileIds !== 'undefined') {
        folder.fileIds.map((index) => {
            files.push(state.files[index]);
        });

        // Sort by name.
        files.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    return  {
        folders: folders,
        files: files,
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeFolderStatus,
    fetchFolderData,
    setSelected,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GridView));
