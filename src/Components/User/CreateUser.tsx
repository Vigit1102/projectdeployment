import React, { useState } from 'react';
import {
    TextField, Button, Container, Snackbar, Typography, Alert, FormControl, Radio, FormLabel, RadioGroup, FormControlLabel,
    InputLabel, Select, MenuItem, OutlinedInput, ListItemText, Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Redux/reducer';
import { AppDispatch } from '../../Redux/store';
import { Errors, formData } from '../../Models/User';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },},};

const names = ['Java', 'Python', '.net', 'Angular', 'React.JS', 'Node.JS'];

export const CreateUser: React.FC = () => {
    const [formData, setFormData] = useState<formData>({
        firstname: '',
        lastname: '',
        address: '',
        birthdate: '',
        phoneno: '',
        position: '',
        gender: '',
        username: '',
        password: '',
        confirm_password: '',
        language: []
    });
    const [errors, setErrors] = useState<Errors>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (e: any) => {
        const { name, value } = e.target; if (name === "language") {
            const valueArray = typeof value === 'string' ? value.split(',') : value;
            setFormData({
                ...formData,
                [name]: valueArray,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        setErrors({ ...errors, [name]: '' });
    };
    const validate = () => {
        const newErrors: Errors = {};
        if (!formData.firstname) newErrors.firstname = 'First Name is required';
        if (!formData.lastname) newErrors.lastname = 'Last Name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.language) newErrors.language = 'Language is required';
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.confirm_password) newErrors.confirm_password = 'Confirm Password is required';
        if (!/^\d{10}$/.test(formData.phoneno)) {
            newErrors.phoneno = 'Phone Number must be 10 digits';
        }
        return newErrors;
    };

    const onHandle = () => {
        localStorage.setItem("formdata", JSON.stringify(formData))
        localStorage.getItem('formData')
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (formData.password === formData.confirm_password) {
            dispatch(createUser());
            onHandle()
            setSnackbarOpen(true);
            setFormData({
                firstname: '',
                lastname: '',
                address: '',
                birthdate: '',
                phoneno: '',
                gender: '',
                position: '',
                username: '',
                password: '',
                confirm_password: '',
                language: []
            });
        }
        else { alert("Password and Confirm-Password Match") }
    };
    const handlePhoneChange = (e: React.InvalidEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^\d{0,10}$/.test(value)) {
            handleChange(e);
        }
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <>
            <Container>
                <br />
                <Typography variant="h4" gutterBottom>
                    {process.env.REACT_APP_CREATE_FORM_TITLE}
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='Username'
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="firstname"
                                label='Firstname'
                                value={formData.firstname}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.firstname}
                                helperText={errors.firstname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="lastname"
                                label='lastname'
                                value={formData.lastname}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.lastname}
                                helperText={errors.lastname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.address}
                                helperText={errors.address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='Password'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid><Grid item xs={12} sm={4}>
                            <TextField
                                label='Confirm Password'
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.confirm_password}
                                helperText={errors.confirm_password}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={process.env.REACT_APP_FORM_Birthdate}
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.birthdate}
                                helperText={errors.birthdate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={process.env.REACT_APP_FORM_Phone_no}
                                name="phoneno"
                                value={formData.phoneno}
                                onChange={handlePhoneChange}
                                fullWidth
                                inputProps={{
                                    maxLength: 10,
                                }}
                                error={!!errors.phoneno}
                                helperText={errors.phoneno}
                            />
                        </Grid>
                        <FormControl sx={{ m: 1, width: 600 }}>
                            <InputLabel id="demo-multiple-checkbox-label" error={!!errors.language}>Language</InputLabel>
                            < Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name="language"
                                multiple
                                value={formData.language}
                                error={!!errors.language}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Language" />}
                                renderValue={(selected: any) => selected.join(', ')}
                                MenuProps={MenuProps}>
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" error={!!errors.position} >
                                <InputLabel id="demo-select-small-label">Position</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name="position"
                                    value={formData.position}
                                    label={process.env.REACT_APP_FORM_Position}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Developer">Developer</MenuItem>
                                    <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                                    <MenuItem value="Tech Lead">Tech Lead</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange} >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
                        Submit
                    </Button>
                </form>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={1000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        User created successfull
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};
