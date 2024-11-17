import React, {useCallback, useState} from 'react';
import {Box, Container, InputAdornment, TextField, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {Email, Key, Login} from "@mui/icons-material";
import {SubmitButton} from "../components/SubmitButton.jsx";
import {ajaxLogin} from "../components/ajax.jsx";
import Config from "../config.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(async (event) => {
    setIsLoading(true);
    console.log(event)

    try {

      const response = await ajaxLogin(Config.webApiUrl + "/login", {email, password})
      if (response) {
        localStorage.setItem('token', response.token);
        navigate("/");
        setIsLoading(false);
      }
    }
    catch (e) {
      console.error(e);
      setIsLoading(false);
      setError("Error occured during login. Please try again later.");
    }

  }, [email, navigate, password]);

  return (
    <Container maxWidth="sm" sx={{mt: 8}}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" sx={{mt: 2}}>
        <TextField
          fullWidth
          label="Email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{mb: 2}}
        />
        <TextField
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            },
          }}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{mb: 2}}
        />
        <SubmitButton error={error} text={"Login"} onSubmit={handleLogin} isLoading={isLoading} icon={<Login />}/>
      </Box>
    </Container>
  );
}
