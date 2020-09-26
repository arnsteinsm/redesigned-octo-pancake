import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import ApiCredentialsProvider from './Context/ApiCredentialsProvider';
import LogRocket from 'logrocket';

LogRocket.init('7cayg5/hervik-dash');

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ApiCredentialsProvider>
        <App />
      </ApiCredentialsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
