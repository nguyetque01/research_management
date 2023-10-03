import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function RegisterConfirmationDialog({
  isOpen,
  onClose,
  onRegister,
  // itemToRegister,
  dataLabel,
  // itemName,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="register-dialog-title"
      aria-describedby="register-dialog-description"
    >
      <DialogTitle id="register-dialog-title">
        Xác nhận đăng ký {dataLabel}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="register-dialog-description">
          Bạn có chắc chắn muốn đăng ký {dataLabel} này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={onRegister}
          color="primary"
          autoFocus
        >
          Đăng ký
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterConfirmationDialog;
