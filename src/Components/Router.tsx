import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Explorer from "./Routes/Explorer";
import Contracts from "./Routes/Contracts";
import Nodes from "./Routes/Nodes";
import { QuorumConfig } from "./Types/QuorumConfig";
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
