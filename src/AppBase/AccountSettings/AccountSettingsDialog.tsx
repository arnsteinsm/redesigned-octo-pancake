import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import firebase from '../../firebase';
import TextField from '@material-ui/core/TextField';

interface Props {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const AccountSettingsDialog: React.FunctionComponent<Props> = ({
  openState,
}) => {
  const [open, setOpen] = openState;
  const passwordState = useState('');
  const [password, setPassword] = passwordState;

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const { currentUser } = firebase.auth();
    if (currentUser && password) {
      currentUser.updatePassword(password);
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
          Husk at innstillingene her skal gjelde alle brukere denne kontoen.
          Bruk derfor passord det er greit å dele men som også er sikre.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Nytt passord"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
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
