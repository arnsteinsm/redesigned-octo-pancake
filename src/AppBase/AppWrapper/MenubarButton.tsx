import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import appWrapperStyles from './appWrapper.module.css';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../../Context/AuthProvider';

interface Props {
  route: string;
  shouldLogOut?: boolean;
  children?: React.ReactNode;
}

const MenubarButton: React.FunctionComponent<Props> = ({
  children,
  route,
  shouldLogOut,
}) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  return (
    <IconButton
      component="span"
      size="small"
      color="secondary"
      onClick={() => {
        if (shouldLogOut) {
          logOut();
        }
        navigate(route);
      }}
      className={appWrapperStyles.iconButton}
    >
      {children}
    </IconButton>
  );
};

export default MenubarButton;
