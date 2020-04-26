import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./home";
import { Admin } from "./admin";
import { NotFound } from "./not-found";

export const RootPage = () => (
  <Router>
    <Switch>
      <Route path="/admin" render={Admin} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route component={NotFound} />
    </Switch>
  </Router>
);
