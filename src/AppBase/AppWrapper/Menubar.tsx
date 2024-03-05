import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

import hervikHjerteIcon from '../../Media/AppIcons/hervik-hjerte.png';
import appWrapperStyles from './appWrapper.module.css';
import Power from '@mui/icons-material/PowerSettingsNew';
import MenubarButton from './MenubarButton';

const Menubar = () => {
  const location = useLocation(); // Use useLocation to access the current location object

  const [isSubPage, setIsSubPage] = useState(false);

  useEffect(() => {
    // Check if the current path is longer than 1 character (i.e., not the root path "/")
    setIsSubPage(location.pathname.length > 1);
  }, [location]); // Depend on location to re-evaluate when the path changes

  return (
    <div className={appWrapperStyles.menuBar}>
      <div id="menuLeft">
        {/* Use the state to determine the route for the MenubarButton */}
        <MenubarButton route={isSubPage ? '/authed' : '/'}>
          <img src={hervikHjerteIcon} height="36px" alt="logo" />
        </MenubarButton>
      </div>
      {isSubPage && (
        <div id="menuRight">
          {/* On subpages, provide a logout button or redirect to the root */}
          <MenubarButton shouldLogOut={true} route={'/'}>
            <Power
              htmlColor="white"
              className={appWrapperStyles.iconButtonIcon}
            />
          </MenubarButton>
        </div>
      )}
    </div>
  );
};

export default Menubar;
