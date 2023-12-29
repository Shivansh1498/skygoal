import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  let isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SKYGOAL PROJECT
          </Typography>
          {isLoggedIn ? (
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
