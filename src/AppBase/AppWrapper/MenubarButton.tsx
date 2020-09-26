import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import appWrapperStyles from './appWrapper.module.css';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../../Context/AuthProvider';

interface Props {
  route: string;
  shouldLogOut?: boolean;
}

const MenubarButton: React.FunctionComponent<Props> = ({
  children,
  route,
  shouldLogOut,
}) => {
  const history = useHistory();
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
        history.push(route);
      }}
      className={appWrapperStyles.iconButton}
    >
      {children}
    </IconButton>
  );
};

export default MenubarButton;
