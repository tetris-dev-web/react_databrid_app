import React, { useEffect, useState } from "react";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export interface UserDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function SimpleDialog(props: UserDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
