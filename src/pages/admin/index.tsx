import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginAdmin } from "./outside-admin/login";
import { InsideAdmin } from "./inside-admin";

import { PrivateRoute } from "routes/react-router-custom-route";
import { adminAppRouter } from "routes/internal-router";

export const Admin = () => {
  return (
    <Switch>
      <PrivateRoute path={adminAppRouter.home()}>
        <InsideAdmin />
      </PrivateRoute>
      <Route exact component={LoginAdmin} path={adminAppRouter.login()} />
    </Switch>
  );
};
