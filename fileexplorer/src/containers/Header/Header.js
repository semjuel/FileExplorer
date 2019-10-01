import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import HeaderRefreshBtn from "./ActionBtns/HeaderRefreshBtn";
import SettingsBtns from "../../components/Header/SettingsBtns";
import Logo from '../Logo/Logo';
import HeaderUploadBtn from "./ActionBtns/HeaderUploadBtn";
import HeaderAddFolderBtn from "./ActionBtns/HeaderAddFolderBtn";
import HeaderFileCopyBtn from "./ActionBtns/HeaderFileCopyBtn";
import HeaderRenameBtn from "./ActionBtns/HeaderRenameBtn";
import HeaderDeleteBtn from "./ActionBtns/HeaderDeleteBtn";

const styles = theme => ({
    bar: {
        background: '#fff',
        color: '#000',
        zIndex: 2,
    },
    grow: {
        flexGrow: 1,
    },
    divider: {
        margin: '0 20px',
        width: '1px',
        height: '50px',
    },
    logoWrapper: {
        width: '240px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        width: '50px',
        height: '50px',
    },
    icon: {
        '&:hover': {
            color: '#006AFE',
        }
    },
});


class Header extends Component {

    render() {
        const { classes } = this.props;

        return (
            <AppBar className={classes.bar} position="fixed">
                <Toolbar>
                    <Typography className={classes.logoWrapper} variant="h5">
                        <Logo viewBox='0 0 50 50' className={classes.logo} />
                        FileExplorer
                    </Typography>

                    <div className={classes.grow} />

                    <Divider className={classes.divider}  component='div'/>

                    <HeaderRefreshBtn className={classes.icon} />

                    <HeaderUploadBtn disabled className={classes.icon} />

                    <HeaderAddFolderBtn className={classes.icon} />

                    <HeaderFileCopyBtn disabled className={classes.icon} />

                    <HeaderRenameBtn disabled className={classes.icon} />

                    <HeaderDeleteBtn disabled className={classes.icon} />

                    <Divider className={classes.divider}  component='div'/>

                    <SettingsBtns />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
