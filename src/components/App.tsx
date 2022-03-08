import React, { Component } from 'react';
import './App.css';
import { Container } from '@chakra-ui/react'
import Router from './Router';
import Navigation from './Navigation';
import Footer from './Footer';

interface IProps {
}

interface IState {
}

class App extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
  }
  
  render(){
    return (
      <div className="App">
          <Navigation />
          <Router />
          <Footer />
      </div>
    );
  }

}

export default App;
