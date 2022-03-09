import React, { Component } from 'react';
import { Container } from '@chakra-ui/react'
import Router from './Router';
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
          <Router config={this.quorumConfig}/>
      </div>
    );
  }

}

export default App;
