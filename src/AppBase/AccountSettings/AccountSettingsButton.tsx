import React, { useState } from 'react';
import Button from '@mui/material/Button';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import accountSettingsStyle from './accountSettings.module.css';
import AccountSettingsDialog from './AccountSettingsDialog';

const AccountSettingsButton: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const settingsButtonProps = {
    variant: 'text' as const,
    size: 'large' as const,
    endIcon: <ChevronRightIcon />,
    onClick: () => setOpen(true),
  };

  return (
    <>
      <Button
        {...settingsButtonProps}
        className={accountSettingsStyle.accountSettingsButton}
      >
        Kontoinnstillinger
      </Button>
      {open && <AccountSettingsDialog openState={[open, setOpen]} />}
    </>
  );
};

export default AccountSettingsButton;
