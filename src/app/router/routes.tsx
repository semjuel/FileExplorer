import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteGuard, { RouteGuardType } from '@components/RouteGuard';
import Loadable from 'react-loadable';

import Authorization from '@containers/Auth';
import HandleToken from '@containers/Auth/HandleToken';
import { Preloader } from '@app/components';

const Main = Loadable({
  loader: () => import('@containers/Main'),
  loading: () => <Preloader loading={true} />,
});

const ForgotPassword = Loadable({
  loader: () => import('@containers/Auth/ForgotPassword'),
  loading: () => <Preloader loading={true} />,
});

const ResetPassword = Loadable({
  loader: () => import('@containers/Auth/ResetPassword'),
  loading: () => <Preloader loading={true} />,
});

const ConfirmEmail = Loadable({
  loader: () => import('@containers/Auth/ConfirmEmail'),
  loading: () => <Preloader loading={true} />,
});

const ActivateUser = Loadable({
  loader: () => import('@containers/Auth/Activate'),
  loading: () => <Preloader loading={true} />,
});

const Terms = Loadable({
  loader: () => import('@containers/Auth/Terms'),
  loading: () => <Preloader loading={true} />,
});

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <RouteGuard
          type={RouteGuardType.REQUIRE_UNAUTHORIZE}
          path="/authorization"
          component={Authorization}
        />
        <Route path="/terms" component={Terms} />
        <RouteGuard
          type={RouteGuardType.REQUIRE_UNAUTHORIZE}
          path="/forgot-password"
          component={ForgotPassword}
        />
        <Route path="/confirm-email" component={ConfirmEmail} />
        <RouteGuard
          type={RouteGuardType.REQUIRE_UNAUTHORIZE}
          path="/reset-password/:token"
          component={ResetPassword}
        />
        <Route path="/activate/:token" component={ActivateUser} />
        <RouteGuard
          type={RouteGuardType.REQUIRE_UNAUTHORIZE}
          path="/authentication/handletoken"
          component={HandleToken}
        />
        <Route path="/" component={Main} />
      </Switch>
    );
  }
}
