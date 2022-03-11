import React, { Component } from 'react';
import { Container } from '@chakra-ui/react'
import Router from './Router';
import { QuorumConfig } from './Types/QuorumConfig';
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
const config = require('../Config/config.json');


interface IProps {
}

interface IState {
}

class App extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
  }
  quorumConfig: QuorumConfig = config;
  
  render(){
    return (
      <div className="App">
          <NavBar />
          <Router config={this.quorumConfig}/>
          <Footer />
      </div>
    );
  }

}

export default App;
