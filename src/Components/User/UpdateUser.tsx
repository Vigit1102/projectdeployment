import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Alert, Button, Card, Container, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import styles from './UpdateUser.module.css'
import { updateUser } from '../../Redux/reducer';
import { AppDispatch } from '../../Redux/store';
import { UpdateFormData, User } from '../../Models/User';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Java', 'Python', '.net', 'Angular', 'React.JS', 'Node.JS'];
export const UpdateUser:React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [update, setUpdate] = useState<UpdateFormData>({
    firstname: '',
    lastname: '',
    address: '',
    birthdate: '',
    phoneno: '',
    gender: '',
    position: '',
    username: '',
    language: [],
  });
  const { users } = useSelector((state: { appStore: { users: User[] } }) => state.appStore); 
  const dispatch = useDispatch<AppDispatch>()
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {  
      const singleUser = users.find((user) => String(user.id) === id); 
      if (singleUser) {
        setUpdate({
          firstname: singleUser.firstname,
          lastname: singleUser.lastname,
          birthdate: singleUser.birthdate ? new Date(singleUser.birthdate).toISOString().split('T')[0] : '',
          phoneno: singleUser.phoneno,
          address: singleUser.address,
          gender: singleUser.gender,
          position: singleUser.position,
          language: singleUser.language,
          username: singleUser.username,
        });
      }
    }
  }, [id, users]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericId = id ? parseInt(id, 10) : NaN;
    if (isNaN(numericId)) {
      console.error("Invalid ID"); 
      return;
    }
    dispatch(updateUser({ id:numericId, update }));
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/userlist');
    }, 1000);
  };
  const onUpdateData = (e:any) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name as string]: value }));
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Typography variant="h4" className={styles.title}>
          {process.env.REACT_APP_UPDATE_FORM_TITLE}
        </Typography>
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <TextField
                className={styles.inputField}
                label="Username"
                name="username"
                value={update.username}
                onChange={onUpdateData}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className={styles.inputField}
                label={process.env.REACT_APP_FORM_FIRST_Name}
                name="firstname"
                value={update.firstname}
                onChange={onUpdateData}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className={styles.inputField}
                label={process.env.REACT_APP_FORM_Last_Name}
                name="lastname"
                value={update.lastname}
                onChange={onUpdateData}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={styles.inputField}
                label={process.env.REACT_APP_FORM_Address}
                name="address"
                value={update.address}
                onChange={onUpdateData}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.inputField}
                label={process.env.REACT_APP_FORM_Birthdate}
                type="date"
                name="birthdate"
                value={update.birthdate}
                onChange={onUpdateData}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={styles.inputField}
                label={process.env.REACT_APP_FORM_Phone_no}
                name="phoneno"
                value={update.phoneno}
                onChange={onUpdateData}
                fullWidth
                required
              />
            </Grid>
            <FormControl className={styles.formControl} sx={{ m: 3, width: 600 }}>
              <InputLabel id="demo-multiple-checkbox-label">Language</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                name="language"
                multiple
                value={update.language}
                onChange={onUpdateData}
                input={<OutlinedInput id="select-multiple-chip" label="Language" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Position</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  name="position"
                  value={update.position}
                  label={process.env.REACT_APP_FORM_Position}
                  onChange={onUpdateData}
                >
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                  <MenuItem value="Tech Lead">Tech Lead</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={update.gender}
                  onChange={onUpdateData}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button className={styles.button} variant="contained" color="primary" type="submit" sx={{ marginTop: '16px' }}>
            Submit
          </Button>
          <Link to="/userlist">
            <Button className={styles.button} variant="contained" color="secondary" style={{ marginTop: '16px', marginLeft: '8px' }}>
              Back
            </Button>
          </Link>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            User Updated successfully
          </Alert>
        </Snackbar>
      </Card>
    </Container>
  );
};
