import React, { useContext, PropsWithChildren } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AppContext } from "typed-index";
import { adminAppRouter } from "./internal-router";

export const PrivateRoute = ({
  children,
  ...rest
}: PropsWithChildren<RouteProps>) => {
  const { isConnected } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isConnected ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: adminAppRouter.login(),
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
