import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

interface Props {
  open: boolean;
  children?: ReactNode;
}

const ActionDialog: React.FunctionComponent<Props> = ({ open, children }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Utfør handling</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '400px' }}> {children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default ActionDialog;
