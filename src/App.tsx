// App.js
import './App.css';
import AppWrapper from './AppBase/AppWrapper';
import { Routes, Route } from 'react-router-dom';
import Login from './AppBase/Login/Login';
import AuthedRoutes from './AppBase/AuthedRoutes';

const App = () => {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/authed/*" element={<AuthedRoutes />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </AppWrapper>
  );
};

export default App;
