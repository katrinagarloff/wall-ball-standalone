import React, { Component } from 'react';
import './App.css';
import Canvas from './Canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas width={800} height={800} />
      </div>
    );
  }
}

export default App;
