import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

import Dashboard from "../routes/Dashboard";
import Contracts from "../routes/Contracts";
import Explorer from "../routes/Explorer";
import Nodes from "../routes/Nodes";
import NavBar from "./Navbar/NavBar";
import Footer from "./Footer";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/explorer" element={<Explorer />} />
            <Route exact path="/contracts" element={<Contracts />} />
            <Route exact path="/nodes" element={<Nodes />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
