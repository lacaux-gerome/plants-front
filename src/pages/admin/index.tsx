import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginAdmin } from "./login";
import { HomeAdmin } from "./home";
import { PrivateRoute } from "routes/react-router-custom-route";
import { adminAppRouter } from "routes/internal-router";

export const Admin = () => {
  return (
    <Switch>
      <PrivateRoute path={adminAppRouter.home()} exact>
        <HomeAdmin />
      </PrivateRoute>
      <Route exact component={LoginAdmin} path={adminAppRouter.login()} />
    </Switch>
  );
};
