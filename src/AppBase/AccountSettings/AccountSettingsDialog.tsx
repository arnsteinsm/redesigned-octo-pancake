import React, { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth'; // Import from firebase/auth
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface Props {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const AccountSettingsDialog: React.FunctionComponent<Props> = ({
  openState,
}) => {
  const [open, setOpen] = openState;
  const [password, setPassword] = useState('');

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const auth = getAuth(); // Get the auth instance
    const user = auth.currentUser;

    if (user && password) {
      updatePassword(user, password) // Use the updatePassword method
        .then(() => {
          // Handle successful password update here
          console.log('Password updated successfully.');
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error updating password:', error);
        });
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Kontoinnstillinger</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Husk at innstillingene her skal gjelde alle brukere av denne kontoen.
          Bruk derfor passord det er greit å dele men som også er sikre.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Nytt passord"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Lukk
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lagre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountSettingsDialog;
