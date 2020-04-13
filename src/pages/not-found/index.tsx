import React from "react";
import { Route } from "react-router-dom";

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.statusCode = code;
      return children;
    }}
  />
);

export const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);
