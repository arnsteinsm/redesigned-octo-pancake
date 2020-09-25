import React, { Suspense } from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Switcher from './Switcher';
import { APP_IDS } from '../Types';

const FraktApp = React.lazy(() => import('../FraktApp'));

const AuthedRoutes = () => {
  const match = useRouteMatch();

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={match.path + `/${APP_IDS.KLARNA}`}>
          <Switcher appId={APP_IDS.KLARNA} />
        </Route>
        <Route path={match.path + `/${APP_IDS.VISMA}`}>
          <Switcher appId={APP_IDS.VISMA} />
        </Route>
        <Route path={match.path + `/${APP_IDS.POSTEN}`}>
          <FraktApp />
        </Route>
        <Route path={match.path}>
          <Switcher />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AuthedRoutes;
