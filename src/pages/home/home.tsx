import React, {useState} from 'react';
import TableMaterial from "../../components/table/table";
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, userAppSelector} from "../../hooks/redux-hooks";
import {closeModal, IModal, openModal} from "../../store/slices/modal";
import Modal from "../../components/modal/modal";
import * as Yup from "yup";
import {format} from "date-fns";
import {
    useAddTaskMutation,
    useDeleteTaskMutation,
    useGetTaskQuery,
    useUpdateTaskMutation
} from "../../store/services/taskApi";
import SnackbarModal from "../../components/SnackbarModal/SnackbarModal";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import dayjs from 'dayjs';


export interface taskFormValue {
    id?: string;
    name: string;
    date: string;
    status: string;
}

const Home = () => {
    const dispatch = useAppDispatch();
    const [createTask] = useAddTaskMutation();
    const {data} = useGetTaskQuery();
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [getName, setName] = useState<string>();
    const {isActionSnackBar, message} = userAppSelector(state => state.snackBar);
    const {isEditModal, isChangeActive} = userAppSelector(state => (state.modal as IModal));

    const taskForm = useFormik({
        initialValues: {
            name: '',
            date: '',
            status: ''
        },
        onSubmit: (values: taskFormValue): void => {

            const formatDate = format(new Date(values.date), "MMMM dd, yyyy");
            console.log(values)
            if (isEditModal) {
                addTask(values, formatDate)
            } else {
                saveTask(values, formatDate)
            }
            handleClose();
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Please enter name').test({
                message: () => 'name repeat!',
                test: async (value: string): Promise<boolean> => {
                    const array = data?.map((el: taskFormValue) => el.name.toLowerCase().trim());
                    return await validateNameAsync(value, array);
                }
            }),
            status: Yup.string().required('Please choose status'),
            date: Yup.date().required('Please choose date')
        })
    });

    const snackBar = (message: string, name: string) => {
        dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `${message} ${name}`}));
    }

    const addTask = (values: taskFormValue, formatDate: string) => {
        createTask({...values, date: formatDate}).then(() => snackBar('Add Task', values.name));
    }

    const saveTask = (values: taskFormValue, formatDate: string): void => {
        updateTask({...values, date: formatDate}).then(() => snackBar('Update Task', values.name));
    }

    const validateNameAsync = async (value: string, arrayName: string[] | undefined): Promise<boolean> => {
        if (!arrayName || (!isEditModal && value === getName)) {
            return true;
        }
        return !arrayName.includes(value.toLowerCase().trim());
    };

    const handleClickOpen = (): void => {
        dispatch(openModal({isEditModal: true, isChangeActive: true}));
    };

    const eventEditTask = (eventTask: taskFormValue) => {
        dispatch(openModal({isEditModal: false, isChangeActive: true}));
        taskForm.setValues({...eventTask, date: dayjs(eventTask.date) as any});
        setName(eventTask.name);
    }

    const eventDeleteTask = ({id, name}: taskFormValue) => {
        deleteTask(id as string).then(() => {
            snackBar('Delete Task', name)
        })
    }

    const handleClose = (): void => {
        dispatch(closeModal());
        taskForm.resetForm();
    }

    return (
        <div>
            <SnackbarModal open={isActionSnackBar} message={message}/>
            <div className='mb-2'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Task
                </Button>
                <Modal open={isChangeActive} form={taskForm} isEdit={isEditModal} eventCloseModal={handleClose}/>
            </div>
            <TableMaterial
                tbodyData={data}
                eventEdit={eventEditTask}
                evenDelete={eventDeleteTask}
            />
        </div>
    );
};

export default Home;