import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

interface Props {
  open: boolean;
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
