import React from "react";
import logo from "../../logo.svg";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import "./App.css";
import { Plant } from "generated/graphql";

const GET_ALL_PLANTS = gql`
  query plants {
    id
    description
    name
  }
`;

export const App = () => {
  const { data, loading, error } = useQuery<Plant[], {}>(GET_ALL_PLANTS);
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>{error}</>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {console.log("data", data)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
