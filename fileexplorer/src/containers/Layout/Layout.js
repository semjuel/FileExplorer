import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header/Header';
import Sidebar from '../LeftSidebar/LeftSidebar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '@global': {
            '*::-webkit-scrollbar': {
                width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,140,254,.4)',
                outline: '1px solid slategrey'
            }
        }
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
