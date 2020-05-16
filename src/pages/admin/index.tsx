import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginAdmin } from "./outside-admin/login";
import { InsideAdmin } from "./inside-admin";

import { PrivateRoute } from "routes/react-router-custom-route";
import { adminAppRouter } from "routes/internal-router";

export const Admin = () => {
  return (
    <Switch>
      {/* Order matters do not change the order without being sure that made what you want */}
      <Route exact component={LoginAdmin} path={adminAppRouter.login()} />
      <PrivateRoute path={adminAppRouter.home()}>
        <InsideAdmin />
      </PrivateRoute>
    </Switch>
  );
};
