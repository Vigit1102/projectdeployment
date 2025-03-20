import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import {
    Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Paper, Snackbar, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CreateUser } from './CreateUser';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from './UpdateUser.module.css';
import { Sheet } from '@mui/joy';
import { deleteUser, fetchUser } from '../../Redux/reducer';
import { AppDispatch } from '../../Redux/store';
import { Column, User, UserListProps } from '../../Models/User';


export const UserList: React.FC<UserListProps> = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [columns, setColumns] = useState<Column[]>([
        // { id: 'username', label: 'UserName' },
        { id: 'firstname', label: 'First Name' },
        { id: 'lastname', label: 'Last Name' },
        { id: 'address', label: 'Address' },
        { id: 'phoneno', label: 'Phone No' },
        { id: 'birthdate', label: 'Birthdate' },
        { id: 'gender', label: 'Gender' },
        { id: 'position', label: 'Position' },
        { id: 'language', label: 'Language' },
        { id: 'action', label: 'Action' },
    ]);
    const dispatch = useDispatch<AppDispatch>()
    const users: User[] = useSelector((state: any) => state.appStore.users);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDelete = (id: number) => {
        dispatch(deleteUser(id));
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const filteredUsers = users.filter((user) =>
        `${user.firstname} ${user.username} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newColumns = Array.from(columns);
        const [removed] = newColumns.splice(result.source.index, 1);
        newColumns.splice(result.destination.index, 0, removed);
        setColumns(newColumns);
    };
    return (
        <Card className={styles.card}>
            <Box className={styles.buttonContainer} display="flex" alignItems="center" justifyContent="space-between">
                <Box className={styles.buttonContainer} display="flex" alignItems="center" justifyContent="space-between" sx={{ marginLeft: 5 }}>
                    <TextField
                        sx={{ flexGrow: 1, marginRight: 150 }}
                        id="outlined-search"
                        label="Search field"
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button size="large" color="secondary" variant="contained" onClick={() => setOpen(true)}>
                        Add User
                    </Button>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <CreateUser />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
                            Back
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <CardContent>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided: any) => (
                                <TableContainer ref={provided.innerRef} {...provided.droppableProps}>
                                    <Sheet>
                                        <Table
                                            borderAxis="both"
                                            color="neutral"
                                            stickyFooter={false}
                                            stickyHeader
                                            stripe="odd"
                                            variant="soft">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column, index) => (
                                                        <Draggable key={column.id} draggableId={column.id} index={index}>
                                                            {(provided: any) => (
                                                                <TableCell
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={styles.tableCell}>
                                                                    {column.label}
                                                                </TableCell>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                    <TableRow hover key={row.id}>
                                                        {columns.map((column) => (
                                                            <TableCell key={column.id} className={styles.tableCell}>
                                                                {column.id === 'action' ? (
                                                                    <>
                                                                        <Tooltip title="Update">
                                                                            <Link to={`/edituser/${row.id}`} state={user}>
                                                                                <EditIcon sx={{ color: 'green', cursor: 'pointer', marginRight: 1 }} />
                                                                            </Link>
                                                                        </Tooltip>
                                                                        <Tooltip title="Delete">
                                                                            <DeleteIcon
                                                                                sx={{ color: 'red', cursor: 'pointer' }}
                                                                                onClick={() => handleDelete(Number(row.id))}
                                                                            />
                                                                        </Tooltip>
                                                                    </>
                                                                ) : column.id === 'language' ? (
                                                                    Array.isArray(row.language) ? row.language.join(', ') : row.language
                                                                ) : (
                                                                    row[column.id as keyof User] || ''
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        {provided.placeholder}
                                    </Sheet>
                                </TableContainer>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <Link to='/'>
                                <Button variant="outlined" color="error">BACK</Button>
                            </Link>
                            <br />
                            <br />
                            <Link to='/userchecklist'>
                                <Button variant="outlined" color="success">CHECK LIST</Button>
                            </Link>
                        </div>
                    </Box>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </CardContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    User Deleted successfully!
                </Alert>
            </Snackbar>
        </Card>
    );
};
