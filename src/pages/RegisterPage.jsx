import {useCallback, useState} from 'react';
import {Box, Button, Container, Grid, Grid2, TextField, Typography} from '@mui/material';
import {SubmitButton} from "../components/SubmitButton.jsx";
import {PersonAdd} from "@mui/icons-material";
import RolePickDialog from "../components/register/RolePickDialog.jsx";
import {ajaxRegister} from "../components/ajax.jsx";
import Config from "../config.jsx";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState('User');
  const [openDialog, setOpenDialog] = useState(false);

  const handleRegister = useCallback(async (event) => {
    setIsLoading(true)
      if(!firstName || !lastName || !email || !password){
        setError("All fields are required");
        setIsLoading(false)
        return;
      }
    if(password !== confirmPassword){
      setError("Passwords do not match");
      setIsLoading(false)
      return;
    }
    if(password.length < 6){
      setError("Password must be at least 6 characters long");
      setIsLoading(false)
      return;
    }
    if(!email.includes("@") || !email.includes(".")){
      setError("Invalid email");
      setIsLoading(false)
      return;
    }

    setError(null);

    try {
      const lowerRole = role.toUpperCase();
      const response = await ajaxRegister(Config.webApiUrl + "/register", {firstName, lastName, email, password, role: lowerRole});
      console.log(response);
    }
    catch (e) {
      console.error(e);
      setError("Error occured during registration. Please try again later.");

    }

    setIsLoading(false);


  }, [firstName, lastName, email, password, confirmPassword, role]);

  return (
    <Container maxWidth="sm" sx={{mt: 8}}>
      <Typography variant="h4" gutterBottom>
        Register as <Button color={"secondary"} variant="contained" onClick={() => setOpenDialog(true)}>
        {role}
      </Button>
      </Typography>
      <Box component="form" sx={{mt: 2}}>

        <Grid2 container>
          <Grid2 size={"grow"} sx={{marginRight: 1}}>
            <TextField
              error={error && !firstName}
              label={"First Name"} fullWidth sx={{mb: 2}}
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}

            />
          </Grid2>
          <Grid2 size={"grow"}>
            <TextField error={error && !lastName} label={"Last Name"} fullWidth sx={{mb: 2}}
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}

            />
          </Grid2>
        </Grid2>

        <TextField
          fullWidth
          error={!!((error && !email) || (email && !email.includes("@")) || (email && !email.includes(".")))}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{mb: 2}}
        />
        <TextField
          fullWidth
          error={!!(error && !password || password.length !== 0 && password.length < 6)}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{mb: 2}}
        />
        <TextField
          fullWidth
          error={!!(password !== confirmPassword || error && !confirmPassword)}
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{mb: 2}}
        />

        <SubmitButton text={"Register"} onSubmit={handleRegister} isLoading={isLoading} error={error}
                      icon={<PersonAdd/>}/>
        <RolePickDialog open={openDialog} onClose={(value) => {
          setRole(value);
          setOpenDialog(false);
        }} value={role}/>

      </Box>
    </Container>
  );
}
