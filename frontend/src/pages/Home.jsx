import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";

const Home = () => {
  const userInfo = useSelector((state) => state.auth?.userInfo?.userInfo);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
              <Stack spacing={5}>
                <Typography variant={"h4"}>
                  Welcome {userInfo?.username}
                </Typography>
                <Typography variant={"body1"}>
                  <strong>Email:</strong> {userInfo?.email}
                </Typography>
                <Button variant="contained" color="error" onClick={handleOpen}>
                  Delete Profile
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <CustomModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Home;
