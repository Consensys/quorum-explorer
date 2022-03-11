import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Validators from "./Routes/Validators";
import Explorer from "./Routes/Explorer";
import Contracts from "./Routes/Contracts";
import Nodes from "./Routes/Nodes";
import { QuorumConfig } from "./Types/QuorumConfig";


interface IProps {
  config: QuorumConfig;
}

interface IState {}

class Router extends Component<IProps, IState> {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nodes config={this.props.config} />} />
          <Route path="/validators" element={<Validators config={this.props.config}/>} />
          <Route path="/explorer"  element={<Explorer config={this.props.config} />} />
          <Route path="/contracts" element={<Contracts config={this.props.config} />} />
          <Route path="/nodes" element={<Nodes config={this.props.config} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;
