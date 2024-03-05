import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Logo from '../logo.png';

import fraktAppStyles from '../fraktApp.module.css';

interface Props {
  children?: React.ReactNode;
}

const AppContainer: React.FunctionComponent<Props> = ({ children }) => (
  <div className={fraktAppStyles.appContainer}>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Hervik logo" width="100" height="50" />
        </Navbar.Brand>
      </Container>
    </Navbar>
    <Container className={fraktAppStyles.formContainer}>{children}</Container>
    <Navbar bg="dark" data-bs-theme="dark">
      <div style={{ color: 'white', textAlign: 'center', width: '100%' }}>
        Fraktapp Nettbutikk
      </div>
    </Navbar>
  </div>
);

export default AppContainer;
