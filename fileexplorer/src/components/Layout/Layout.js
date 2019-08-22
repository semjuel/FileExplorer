import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import Header from '../../containers/Header/Header';
import Sidebar from "../Sidebar/Sidebar";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    mainWrapper: {

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: '#E8F1F7',
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Layout( props ) {
    const classes = useStyles();

    return (
        <Aux>
            <Header />

            <div className={classes.root}>
                <Sidebar/>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.mainWrapper}>
                        {props.children}
                    </div>
                </main>
            </div>
        </Aux>
    );
}
