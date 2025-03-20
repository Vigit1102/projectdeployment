import React, { useEffect, useState } from 'react';
import {  TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Sheet, Table } from '@mui/joy';
import { List } from '../../Models/User';

export const UserCheckList: React.FC = () => {
    const [studentState, setStudentState] = useState<List[]>([]);

    useEffect(() => {
        const initialStudentState = [
            {
                id: 1, name: "Project Manager",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 2, name: "Project Role User",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 3, name: "User",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 4, name: "User Project Role",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 5, name: "Environment",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 6, name: "Project",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 7, name: "Role",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 8, name: "Role Permission",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 9, name: "Component",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
            {
                id: 10, name: "Sprint",
                isView: false, isAdd: false, isEdit: false, isDelete: false
            },
        ];
        setStudentState(initialStudentState);
    }, []);

    const handleSelectAll = (checked: boolean) => {
        setStudentState(studentState.map((d) => ({ ...d, isView: checked })));
    };
    const handleSelectAllAdd = (checked: boolean) => {
        setStudentState(studentState.map((d) => ({ ...d, isAdd: checked })));
    };
    const handleSelectAllEdit = (checked: boolean) => {
        setStudentState(studentState.map((d) => ({ ...d, isEdit: checked })));
    };
    const handleSelectAllDelete = (checked: boolean) => {
        setStudentState(studentState.map((d) => ({ ...d, isDelete: checked })));
    };
    const handleChange = (id: number, checked: boolean) => {
        setStudentState(studentState.map((data) => (data.id === id ? { ...data, isView: checked } : data)));
    };
    const handleChangeAdd = (id: number, checked: boolean) => {
        setStudentState(studentState.map((data) => (data.id === id ? { ...data, isAdd: checked } : data)));
    };
    const handleChangeEdit = (id: number, checked: boolean) => {
        setStudentState(studentState.map((data) => (data.id === id ? { ...data, isEdit: checked } : data)));
    };
    const handleChangeDelete = (id: number, checked: boolean) => {
        setStudentState(studentState.map((data) => (data.id === id ? { ...data, isDelete: checked } : data)));
    };
    return (
        <div className="container">
            <br />
            <TableContainer>
                <Sheet>
                <Table borderAxis="both" color="neutral" variant="outlined" border={2}>
                        <TableHead>
                            <TableRow >
                                <TableCell>System Module</TableCell>
                                <TableCell>
                                    <Checkbox
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        checked={studentState.every((d) => d.isView)}
                                    />
                                    View
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        onChange={(e) => handleSelectAllAdd(e.target.checked)}
                                        checked={studentState.every((d) => d.isAdd)}
                                    />
                                    Add
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        onChange={(e) => handleSelectAllEdit(e.target.checked)}
                                        checked={studentState.every((d) => d.isEdit)}
                                    />
                                    Edit
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        onChange={(e) => handleSelectAllDelete(e.target.checked)}
                                        checked={studentState.every((d) => d.isDelete)}
                                    />
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentState.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(e) => handleChange(d.id, e.target.checked)}
                                            checked={d.isView} />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(e) => handleChangeAdd(d.id, e.target.checked)}
                                            checked={d.isAdd} />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(e) => handleChangeEdit(d.id, e.target.checked)}
                                            checked={d.isEdit} />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onChange={(e) => handleChangeDelete(d.id, e.target.checked)}
                                            checked={d.isDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <br />
                        <Link to='/userlist'>
                            <Button variant="contained" color="error">BACK</Button>
                        </Link>
                    </Table>
                    <br/>
                    <br/>
                </Sheet>
            </TableContainer>
        </div>
    );
};
