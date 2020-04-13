import React from "react";
import { App } from "./pages/home/App";
import * as serviceWorker from "./serviceWorker";
import { render } from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./graphql/apollo";

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
