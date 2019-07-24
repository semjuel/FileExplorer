import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';

const useStyles = makeStyles(theme => ({
    content: {
        background: '#E8F1F7',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MainView() {
    const classes = useStyles();

    return (
        <Aux>
            <EnhancedTable />
        </Aux>
    );
}

