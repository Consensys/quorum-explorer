import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Explorer from "./routes/Explorer";
import Contracts from "./routes/Contracts";
import Nodes from "./routes/Nodes";

interface IProps {
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
          <Route path="/" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/explorer" element={<Explorer/>} />
          <Route path="/contracts" element={<Contracts/>} />
          <Route path="/nodes" element={<Nodes/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router;