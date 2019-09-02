import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

class HeaderDeleteBtn extends Component {

    render() {
        return (
            <IconButton {...this.props} aria-label="Delete">
                <DeleteIcon/>
            </IconButton>
        );
    }
}

export default HeaderDeleteBtn;
