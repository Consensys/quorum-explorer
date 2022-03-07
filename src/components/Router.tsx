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
                <Route path="/" element={<Dashboard/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/explorer" element={<Explorer/>} />
                <Route path="/contracts" element={<Contracts/>} />
                <Route path="/nodes" element={<Nodes/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router;