import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import Navigation from './Navigation';
import Footer from './Footer';

function App() {
  return (
    <div className="App">

      <Navigation />
      <Router />
      <Footer />

    </div>

  );
}

export default App;
