import React from "react";
import { RootPage } from "./pages";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";

import { Reset } from "./styles/reset";
import { client } from "./graphql/apollo";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

type AppContext = {
  isLogin: boolean;
};
const AppContext = React.createContext<AppContext>({ isLogin: false });

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Reset />
        <RootPage />
      </ThemeProvider>
    </ApolloProvider>
  );
};
