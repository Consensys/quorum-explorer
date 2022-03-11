import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./index.css";
import "./custom.css";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
// 1. Import the utilities
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "850px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

// 3. Extend the theme
const theme = extendTheme({ breakpoints });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
