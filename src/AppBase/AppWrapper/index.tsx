import React, { ReactNode } from 'react';
import Menubar from './Menubar';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <>
      <Menubar />
      <>{children}</>
    </>
  );
};

export default AppWrapper;
