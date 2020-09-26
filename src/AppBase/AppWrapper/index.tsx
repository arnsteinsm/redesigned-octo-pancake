import React from 'react';
import Menubar from './Menubar';

const AppWrapper: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Menubar />

      <>{children}</>
    </>
  );
};

export default AppWrapper;
