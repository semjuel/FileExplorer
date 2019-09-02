import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header/Header';
import Sidebar from '../LeftSidebar/LeftSidebar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    mainWrapper: {
        padding: '40px 24px 24px',
    },
    content: {
        flexGrow: 1,
        background: '#E8F1F7',
        height: '100%',
        minHeight: '100vh',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Layout( props ) {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}
