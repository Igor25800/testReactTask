import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IModal {
    isChangeActive: boolean;
    isEditModal: boolean;
}

const initialState: IModal = {
    isChangeActive: false,
    isEditModal: false,
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<IModal>): IModal {
            return action.payload;
        },
        closeModal(state, action: PayloadAction<void>): IModal {
            return {...state, isChangeActive: false};
        }
    }
})

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;