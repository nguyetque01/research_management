import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onDelete,
  itemToDelete,
  dataLabel,
  itemName,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Xác nhận xóa {dataLabel}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Bạn có chắc chắn muốn xóa {dataLabel} "{itemName}" không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button
          onClick={() => onDelete(itemToDelete?.id)}
          color="error"
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
