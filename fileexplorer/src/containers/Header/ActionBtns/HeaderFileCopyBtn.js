import React, {Component} from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from "@material-ui/core/IconButton";

class HeaderFileCopyBtn extends Component {

    render() {
        return (
            <IconButton {...this.props} aria-label="File Copy">
                <FileCopyIcon/>
            </IconButton>
        );
    }
}

export default HeaderFileCopyBtn;
