import React, {Component} from 'react';
import UploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from "@material-ui/core/IconButton";

class HeaderUploadBtn extends Component {

    render() {
        return (
            <IconButton {...this.props} aria-label="Upload File">
                <UploadIcon/>
            </IconButton>
        );
    }
}

export default HeaderUploadBtn;
