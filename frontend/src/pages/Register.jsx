import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync } from "../store/slices/authSlice";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerDetails.password.length > 5) {
      dispatch(registerUserAsync(registerDetails))
        .then((result) => {
          if (result?.meta?.requestStatus === "fulfilled") {
            navigate("/home");
          } else {
            alert("Error in signup");
          }
        })
        .catch((error) => {
          alert(error?.message);
        });
    } else {
      alert("Password length should be more than 5 characters");
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Box mt={5} sx={{ width: "400px" }}>
          <Paper sx={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} direction={"column"}>
                <Typography variant="h4" mt={2} align="center">
                  Register Form
                </Typography>
                <TextField
                  id="register-username"
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={registerDetails.username}
                  onChange={handleChange}
                />
                <TextField
                  id="register-email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={registerDetails.email}
                  onChange={handleChange}
                />
                <TextField
                  id="register-password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={registerDetails.password}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
                <Typography variant="body1" mt={2} align="center">
                  Already a user?{" "}
                  <Link to="/">
                    <Button disableRipple>Login</Button>
                  </Link>
                </Typography>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
