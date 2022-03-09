import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Explorer from "./routes/Explorer";
import Contracts from "./routes/Contracts";
import Nodes from "./routes/Nodes";
import { QuorumConfig } from './types/config';

interface IProps {
  config: QuorumConfig;
}

interface IState {
}

class Router extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
  }

  render (){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard config={this.props.config} />} />
          <Route path="/dashboard" element={<Dashboard config={this.props.config} />} />
          <Route path="/explorer" element={<Explorer config={this.props.config} />} />
          <Route path="/contracts" element={<Contracts config={this.props.config} />} />
          <Route path="/nodes" element={<Nodes config={this.props.config} />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router;