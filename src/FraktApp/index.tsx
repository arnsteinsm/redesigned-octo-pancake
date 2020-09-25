import React, { useContext } from 'react';

import AppContainer from './components/AppContainer';
import AppProvider from './context/FraktAppProvider';

import AppContent from './components/AppContent';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../Context/AuthProvider';

const FraktApp = () => {
  const { loginStatus } = useContext(AuthContext);
  if (loginStatus !== 'LOGGED_IN') {
    return null;
  }
  return (
    <AppProvider>
      <AppContainer>
        <AppContent />
      </AppContainer>
    </AppProvider>
  );
};

export default FraktApp;
