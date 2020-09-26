import React from 'react';
import './App.css';
import AppWrapper from './AppBase/AppWrapper';

import { Switch, Route } from 'react-router-dom';
import Login from './AppBase/Login/Login';
import AuthedRoutes from './AppBase/AuthedRoutes';

const App = () => {
  return (
    <AppWrapper>
      <Switch>
        <Route path="/authed">
          <AuthedRoutes />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </AppWrapper>
  );
};

export default App;
