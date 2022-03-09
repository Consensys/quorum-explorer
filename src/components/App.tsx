import React, { Component } from 'react';
import './App.css';
import { Container } from '@chakra-ui/react'
import Router from './Router';
import Navigation from './Navigation';
import Footer from './Footer';
import { QuorumConfig } from './types/config';
const config = require('../config/config.json');

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
          <Navigation />
          <Router config={this.quorumConfig}/>
          <Footer />
      </div>
    );
  }

}

export default App;
