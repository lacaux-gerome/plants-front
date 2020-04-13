import React from "react";
import logo from "../../logo.svg";
import { useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";

import "./App.css";
import { GetAllPlantsDocument, GetAllPlantsQuery } from "generated/graphql";

// const GET_ALL_PLANTS = gql`
//   query getAllPlants {
//     plants {
//       description
//     }
//   }
// `;

export const App = () => {
  const { data, loading, error } = useQuery<GetAllPlantsQuery, {}>(
    GetAllPlantsDocument
  );
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
        {console.log("data", data?.plants)}
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
