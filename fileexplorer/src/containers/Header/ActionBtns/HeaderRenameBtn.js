import React, {Component} from 'react';
import RenameIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

class HeaderRenameBtn extends Component {

    render() {
        return (
            <IconButton {...this.props} aria-label="Rename">
                <RenameIcon/>
            </IconButton>
        );
    }
}

export default HeaderRenameBtn;
