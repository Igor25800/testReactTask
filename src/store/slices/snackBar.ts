import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SnackBar {
    isActionSnackBar: boolean;
    message: string
}

const initialState: SnackBar = {
    isActionSnackBar: false,
    message: '',
}

const snackBar = createSlice({
    name: 'snackBar',
    initialState,
    reducers: {
        changeOpenSnackBar: (state, action: PayloadAction<{isActionSnackBar: boolean, message?: string}>): void => {
            state.isActionSnackBar = action.payload.isActionSnackBar;
            if(action.payload.message) state.message = action.payload.message
        },
    }
})

export const { changeOpenSnackBar } = snackBar.actions;

export default snackBar.reducer;