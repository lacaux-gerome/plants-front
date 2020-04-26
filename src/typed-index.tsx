import React, { useState } from "react";
import { RootPage } from "./pages";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";

import { Reset } from "./styles/reset";
import { client } from "./graphql/apollo";
import { localStorageWrapper } from "network/local-storage/local-storage-wrapper";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

type AppContext = {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};
// initial AppContext
export const AppContext = React.createContext<AppContext>({
  isConnected: false,
  setIsConnected: () => {},
});

export const App = () => {
  // Init Provider
  const initialIsConnected = localStorageWrapper.getItem<boolean>(
    "isConnectedToAdmin"
  );
  const [isConnected, setIsConnected] = useState<boolean>(
    initialIsConnected || false
  );
  console.log(isConnected);
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={{ isConnected, setIsConnected }}>
        <ThemeProvider theme={theme}>
          <Reset />
          <RootPage />
        </ThemeProvider>
      </AppContext.Provider>
    </ApolloProvider>
  );
};
