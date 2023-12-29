import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserAsync } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProfile = () => {
    dispatch(deleteUserAsync())
      .then((result) => {
        if (result?.meta?.requestStatus === "fulfilled") {
          navigate("/");
        } else {
          alert("Error in deleting profile");
        }
      })
      .catch((error) => {
        alert(error?.message);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h5">
            Are you sure you want to delete your profile ?
          </Typography>
          <div style={{ textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: "10px" }}
              onClick={handleDeleteProfile}
            >
              Yes
            </Button>
          </div>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;
