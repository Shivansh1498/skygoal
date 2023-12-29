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
import { loginUserAsync } from "../store/slices/authSlice";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(loginDetails))
      .then((result) => {
        if (result?.meta?.requestStatus === "fulfilled") {
          navigate("/home");
        } else {
          alert("Error in loggin in");
        }
      })
      .catch((error) => {
        alert(error?.message);
      });
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
              <Stack spacing={2}>
                <Typography variant="h4" mt={2} align="center">
                  Login Form
                </Typography>
                <TextField
                  id="login-email"
                  label="Email"
                  variant="outlined"
                  type="text"
                  value={loginDetails.email}
                  name="email"
                  onChange={handleChange}
                />
                <TextField
                  id="login-password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={loginDetails.password}
                  name="password"
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                  Login
                </Button>
                <Typography variant="body1" mt={2} align="center">
                  Not a member?{" "}
                  <Link to="/register">
                    <Button disableRipple>Register Now</Button>
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

export default Login;
