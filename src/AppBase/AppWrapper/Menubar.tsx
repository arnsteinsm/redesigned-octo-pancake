import React, { useState, useEffect } from 'react';

import hervikHjerteIcon from '../../Media/AppIcons/hervik-hjerte.png';

import appWrapperStyles from './appWrapper.module.css';

import Power from '@material-ui/icons/PowerSettingsNew';
import MenubarButton from './MenubarButton';
import { useRouteMatch } from 'react-router-dom';

const Menubar = () => {
  const match = useRouteMatch();

  const [isSubPage, setIsSubPage] = useState(false);

  useEffect(() => {
    setIsSubPage(window.location.pathname.length > 1);
  }, [match]);

  return (
    <div className={appWrapperStyles.menuBar}>
      <div id='menuLeft'>
        <MenubarButton route={isSubPage ? '/authed' : '/'}>
          <img src={hervikHjerteIcon} height='36px' alt='logo' />
        </MenubarButton>
      </div>
      {isSubPage && (
        <div id='menuRight'>
          <MenubarButton shouldLogOut={true} route={'/'}>
            <Power
              htmlColor='white'
              className={appWrapperStyles.iconButtonIcon}
            />
          </MenubarButton>
        </div>
      )}
    </div>
  );
};

export default Menubar;
