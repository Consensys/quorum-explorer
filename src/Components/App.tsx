
import Router from "./Router";
import { QuorumConfig } from "./Types/QuorumConfig";
const config = require("../Config/config.json");

export default function App() {
  const quorumConfig: QuorumConfig = config;

  return (
    <div className="App">
      <Router config={quorumConfig} />
    </div>
  );
}

