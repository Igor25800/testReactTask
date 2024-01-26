import React, {FC} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import {FormikProps} from "formik";
import {taskFormValue} from "../../pages/home/home";
import {FormHelperText} from "@mui/material";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import style from './modal.module.scss'


export interface ModalProps {
    open: boolean;
    form: FormikProps<taskFormValue>;
    isEdit: boolean;
    eventCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({open, form, isEdit, eventCloseModal}) => {

    return (
        <div>
            <Dialog fullWidth
                    maxWidth="sm" open={open}>
                <DialogTitle>Add Task</DialogTitle>
                <List sx={{pt: 0}}>
                    <form className='p-1' onSubmit={form.handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel id="status">status</InputLabel>
                            <Select
                                id="status"
                                label="status"
                                name='status'
                                value={form.values.status}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.status && !!form.errors.status}>
                                <MenuItem value={'success'}>success</MenuItem>
                                <MenuItem value={'pending'}>pending</MenuItem>
                                <MenuItem value={'close'}>close</MenuItem>
                            </Select>
                            <FormHelperText className='active' sx={{color: 'error.main'}}>
                                {form.touched.status && form.errors.status}
                            </FormHelperText>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="name"
                            name="name"
                            label="Name"
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.name && !!form.errors.name}
                            helperText={form.touched.name && form.errors.name}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Basic date picker"
                                    name='date'
                                    value={form.values.date || null}
                                    onChange={date => {
                                        return  form.setFieldValue('date', date)}}
                                    slotProps={{
                                        textField: {
                                            onBlur: (event) => {
                                                form.setFieldTouched('date', true    )
                                            },
                                            fullWidth: true,
                                            error: form.touched.date && !!form.errors.date,
                                            helperText: form.touched.date && form.errors.date,
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div className={style.blockBtn}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{mt: 3, mb: 2}}>
                                {isEdit ? `Add Task` : `Save Task`}
                            </Button>
                            <Button
                                type="button"
                                color="error"
                                onClick={eventCloseModal}
                                variant="contained"
                                sx={{mt: 3, mb: 2}}>
                                Close
                            </Button>
                        </div>
                    </form>
                </List>
            </Dialog>
        </div>
    );
};

export default Modal;