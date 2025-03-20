// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Card, Container } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import styles from './Login.module.css';

// interface Sign {
//   username: string;
//   password: string;
// }

// interface Errors {
//   username?: string;
//   password?: string;
// }

// interface LoginProps {
//   setUser: (value: boolean) => void;
// }

// export const Login: React.FC<LoginProps> = ({ setUser }) => {
//   const [data, setData] = useState<Sign>({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState<Errors>({});
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     setErrors({ ...errors, [name]: '' });
//     setLoginError('');
//   };

//   const validate = () => {
//     const newErrors: Errors = {};
//     if (!data.username) newErrors.username = 'Username is required';
//     if (!data.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const onStorage = () => {
//     localStorage.setItem('data', JSON.stringify(data));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     const validUsername = 'Vivek';
//     const validPassword = 'vivek1123';
//     if (data.username !== validUsername || data.password !== validPassword) {
//       setLoginError('Invalid username or password');
//     } else {
//       navigate('/userlist');
//       setUser(true);
//       onStorage();
//     }
//   };

//   return (
//     <Container className={styles.container}>
//       <Box>
//         <Card className={styles.card}>
//           <Typography variant="h4" className={styles.title} gutterBottom>
//             Login
//           </Typography>
//           <hr />
//           <form onSubmit={handleSubmit}>
//             <TextField
//               name="username"
//               label="Username"
//               variant="outlined"
//               value={data.username}
//               onChange={handleChange}
//               error={!!errors.username}
//               helperText={errors.username}
//               fullWidth
//             />
//             <br />
//             <br />
//             <TextField
//               name="password"
//               label="Password"
//               variant="outlined"
//               type="password"
//               value={data.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//               fullWidth
//             />
//             {loginError && <Typography className={styles.error}>{loginError}</Typography>}
//             <br />
//             <br />
//             <Button type="submit" variant="contained" color="primary" className={styles.button}>
//               Login
//             </Button>
//           </form>
//           <br />
//           <br />
//           <br />
//         </Card>
//       </Box>
//     </Container>
//   );
// };

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Card, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

interface Sign {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

interface LoginProps {
  setUser: (value: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ setUser }) => {
  // Form starts blank by default
  const [data, setData] = useState<Sign>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Ensure data is empty when component mounts
  useEffect(() => {
    // Clear any stored form data
    localStorage.removeItem('data');
    // Reset form fields
    setData({
      username: '',
      password: '',
    });
  }, []);

  // Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
    setLoginError('');
  };

  // Validate fields
  const validate = () => {
    const newErrors: Errors = {};
    if (!data.username) newErrors.username = 'Username is required';
    if (!data.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // Store user data (optional)
  const onStorage = () => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  // Form submit logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Hardcoded valid credentials
    const validUsername = 'Vivek';
    const validPassword = 'vivek1123';

    if (data.username !== validUsername || data.password !== validPassword) {
      setLoginError('Invalid username or password');
    } else {
      setUser(true);
      onStorage();
      navigate('/userlist');
    }
  };

  return (
    <Container className={styles.container}>
      <Box>
        <Card className={styles.card}>
          <Typography variant="h4" className={styles.title} gutterBottom>
            Login
          </Typography>
          <hr />
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              value={data.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
              autoComplete="off"
            />
            <br />
            <br />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={data.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              autoComplete="off"
            />
            {loginError && <Typography className={styles.error}>{loginError}</Typography>}
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" className={styles.button}>
              Login
            </Button>
          </form>
          <br />
          <br />
        </Card>
      </Box>
    </Container>
  );
};