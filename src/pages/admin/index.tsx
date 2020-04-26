import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

import { LoginAdmin } from "./login";
import { HomeAdmin } from "./home";

export const Admin = (props: RouteComponentProps<{}>) => {
  return (
    <Switch>
      <Route path={`${props.match.path}/login`} component={LoginAdmin} />
      <Route exact path={`${props.match.path}`} component={HomeAdmin} />
    </Switch>
  );
};
