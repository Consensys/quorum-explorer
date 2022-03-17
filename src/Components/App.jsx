import React from "react";
import Router from "./Router";
const config = require("../Config/config.json");

export default function App() {
  const quorumConfig = config;

  return (
    <div className="App">
      <Router config={quorumConfig} />
    </div>
  );
}
