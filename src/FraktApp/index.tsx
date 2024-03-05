import { useContext } from 'react';

import AppContainer from './components/AppContainer';
import AppProvider from './context/FraktAppProvider';

import AppContent from './components/AppContent';

import { AuthContext } from '../Context/AuthProvider';

import 'bootstrap/dist/css/bootstrap.min.css';

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
