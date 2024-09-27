import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { User } from "../../types";

interface UserDetailDialogProps {
  open: boolean;
  handleClose : () => void;
  user: User;
  deleteUser: (userId: string) => void; 
}

const UserDetailDialog = ({ open, handleClose, user, deleteUser }: UserDetailDialogProps) => {
  const handleDelete = () => {
    if (user._id) {
      deleteUser(user._id);
    } else {
      console.error("User ID is undefined.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        User Info
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>아이디:</strong> {user.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>이름:</strong> {user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>이메일:</strong> {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>등급:</strong> {user.level}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>주소:</strong> {user.shipTo}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>연락처:</strong> {user.contact}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          삭제
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailDialog;
