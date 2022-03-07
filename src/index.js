import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
