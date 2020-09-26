import React from 'react';

import switcherStyles from './switcher.module.css';

import hervikBjorn from '../../Media/hervik-bjørn.png';
import AccountSettingsButton from '../AccountSettings/AccountSettingsButton';

const UserInfoContainer = () => {
  return (
    <>
      <div className={switcherStyles.flexRow}>
        <img
          src={hervikBjorn}
          className={switcherStyles.profilePicture}
          alt="profile"
        />
      </div>
      <div className={switcherStyles.flexRow}>
        <h1 className={switcherStyles.profileText}>Hervik's verktøykasse</h1>
      </div>
      <div className={switcherStyles.flexRow}>
        <AccountSettingsButton />
      </div>
    </>
  );
};

export default UserInfoContainer;
