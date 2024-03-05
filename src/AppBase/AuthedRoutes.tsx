// AuthedRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Switcher from './Switcher';
import { APP_IDS } from '../Types';

const FraktApp = React.lazy(() => import('../FraktApp'));

const AuthedRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path={`${APP_IDS.KLARNA}/*`}
          element={<Switcher appId={APP_IDS.KLARNA} />}
        />
        <Route
          path={`${APP_IDS.VISMA}/*`}
          element={<Switcher appId={APP_IDS.VISMA} />}
        />
        <Route path={`${APP_IDS.POSTEN}/*`} element={<FraktApp />} />
        <Route path="*" element={<Switcher />} />
      </Routes>
    </Suspense>
  );
};

export default AuthedRoutes;
