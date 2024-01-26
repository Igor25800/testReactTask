import React, {FC} from 'react';
import {Button, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar'
import {useAppDispatch} from "../../hooks/redux-hooks";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
export interface SnackbarProps {
    open: boolean;
    message: string;
}

const SnackbarModal: FC<SnackbarProps> = ({ open, message}) => {
    const dispatch = useAppDispatch();
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeOpenSnackBar({isActionSnackBar: false}));
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                autoHideDuration={3000}
                open={open}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
};

export default SnackbarModal;