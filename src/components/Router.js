import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Explorer from "./Explorer";
import Contracts from "./Contracts";
import Nodes from "./Nodes";


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard/>} />
                <Route exact path="/dashboard" element={<Dashboard/>} />
                <Route exact path="/explorer" element={<Explorer/>} />
                <Route exact path="/contracts" element={<Contracts/>} />
                <Route exact path="/nodes" element={<Nodes/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router;