import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import switcherStyles from './switcher.module.css';
import { AppButtonConfig, APP_IDS } from '../../Types';

import postenAppIcon from '../../Media/AppIcons/posten.png';
import klarnaAppIcon from '../../Media/AppIcons/klarna.png';
import vismaAppIcon from '../../Media/AppIcons/visma.png';
import { AuthContext } from '../../Context/AuthProvider';

interface Props {
  appId: APP_IDS;
}

const AppButton: React.FunctionComponent<Props> = ({ appId }) => {
  const { userDataState } = useContext(AuthContext);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation(); // Use useLocation to access the current location

  const appButtonConfig: Record<APP_IDS, AppButtonConfig> = {
    posten: {
      buttonText: 'Fraktapp',
      icon: postenAppIcon,
    },
    klarna: {
      buttonText: 'Godkjenn hos klarna',
      icon: klarnaAppIcon,
    },
    visma: {
      buttonText: 'Generer ordrefil',
      icon: vismaAppIcon,
    },
  };

  return (
    <div className={switcherStyles.iconButtonWrapper}>
      <input
        className={switcherStyles.iconButton}
        name={appId}
        aria-label={appId}
        type="image"
        src={appButtonConfig[appId].icon}
        disabled={!userDataState?.privileges[appId]}
        onClick={() => {
          // Use navigate to construct the navigation path
          navigate(`${location.pathname}/${appId}`);
        }}
      />
      <label className={switcherStyles.iconButtonLabel} htmlFor={appId}>
        {appButtonConfig[appId].buttonText}
      </label>
    </div>
  );
};

export default AppButton;
