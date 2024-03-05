import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import ApiCredentialsProvider from './Context/ApiCredentialsProvider';
import LogRocket from 'logrocket';

LogRocket.init('7cayg5/hervik-dash');

// Create a root.
const container = document.getElementById('root');
const root = createRoot(container!); // Use the non-null assertion operator here.

// Render the app within the root.
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ApiCredentialsProvider>
        <App />
      </ApiCredentialsProvider>
    </AuthProvider>
  </BrowserRouter>
);

// Service worker logic remains unchanged
serviceWorker.unregister();
