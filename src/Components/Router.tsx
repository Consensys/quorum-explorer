import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Explorer from "./routes/Explorer";
import Contracts from "./routes/Contracts";
import Nodes from "./routes/Nodes";
import { QuorumConfig } from "./types/config";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

interface IProps {
  config: QuorumConfig;
}

interface IState {}

class Router extends Component<IProps, IState> {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/explorer"
            element={<Explorer config={this.props.config} />}
          />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/nodes" element={<Nodes config={this.props.config} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default Router;
