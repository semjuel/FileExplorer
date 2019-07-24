import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Aux from '../../hoc/Aux';

export default function AddFolderForm() {
    return (
        <Aux>
            <TextField
                required
                id="standard-required"
                label="Enter Folder name"
                margin="normal"
                variant="outlined"
            />

            <Button variant="contained" color="primary">
                Create
            </Button>
        </Aux>
    );
}
