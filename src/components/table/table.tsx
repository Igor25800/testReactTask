import React,{FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {taskFormValue} from "../../pages/home/home";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface InterfaceTable {
    tbodyData: Array<taskFormValue> | undefined
    eventEdit: (eventTask: taskFormValue) => void;
    evenDelete: (eventTask: taskFormValue) => void;
}

const TableMaterial: FC<InterfaceTable> = ({tbodyData, eventEdit, evenDelete}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">date</TableCell>
                        <TableCell align="center">status</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tbodyData?.map((task: taskFormValue) => (
                        <TableRow key={task.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{task.name}</TableCell>
                            <TableCell align="center">{task.date}</TableCell>
                            <TableCell align="center">{task.status}</TableCell>
                            <TableCell align="center">
                                <EditIcon
                                    cursor={'pointer'}
                                    onClick={() => eventEdit(task)}/>
                            </TableCell>
                            <TableCell align="center">
                                <DeleteIcon
                                    cursor={'pointer'}
                                    onClick={() => evenDelete(task)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableMaterial;