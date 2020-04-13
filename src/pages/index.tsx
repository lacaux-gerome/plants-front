import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./home";
import { Admin } from "./admin";
import { NotFound } from "./not-found";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route component={NotFound} />
    </Switch>
  </Router>
);
