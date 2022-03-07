import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../routes/Dashboard";
import Contracts from "../routes/Contracts";
import Explorer from "../routes/Explorer";
import Nodes from "../routes/Nodes";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/explorer" element={<Explorer />} />
          <Route exact path="/contracts" element={<Contracts />} />
          <Route exact path="/nodes" element={<Nodes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
