import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

import { LoginAdmin } from "./login";
import { HomeAdmin } from "./home";

export const Admin = (props: RouteComponentProps<{}>) => {
  return (
    <Switch>
      <Route path={`${props.match.path}/login`} render={LoginAdmin} />
      <Route path={`${props.match.path}/home`} render={HomeAdmin} />
    </Switch>
  );
};
