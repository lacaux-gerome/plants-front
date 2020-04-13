import React from "react";
import logo from "../../logo.svg";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";
import { GetAllPlantsDocument, GetAllPlantsQuery } from "generated/graphql";

export const Home = () => {
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
        {console.log("data", data?.plants)}
      </header>
    </div>
  );
};
