import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Aux from '../../hoc/Aux';

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
            <Typography>
                Table with files....
            </Typography>
        </Aux>
    );
}

