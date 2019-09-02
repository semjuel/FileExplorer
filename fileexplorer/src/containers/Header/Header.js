import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ActionBtns from "../../components/Header/ActionBtns";
import SettingsBtns from "../../components/Header/SettingsBtns";
import Logo from '../Logo/Logo';

const styles = theme => ({
    bar: {
        background: '#fff',
        color: '#000',
        zIndex: 1,
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

                    <ActionBtns />

                    <Divider className={classes.divider}  component='div'/>

                    <SettingsBtns />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
