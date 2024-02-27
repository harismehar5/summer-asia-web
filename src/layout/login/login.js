import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '16px',
});

const StyledButton = styled(Button)({
  margin: '16px 0 32px',
});

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if the entered username and password are the expected values
    if (username === 'demo' && password === 'demo') {
      localStorage.setItem('login', true);
      navigate('/');
      setUsername("");
      setPassword("");
    } else {
      setError('Invalid username or password');
    }
  };

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (login) {
      navigate('/');
    }
  }, []);

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Log In
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;