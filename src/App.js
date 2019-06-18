import React, { Component } from 'react';
import './App.css';
import TriviaGame from './trivia/TriviaGame';


class App extends Component {
  render() {  
    return (
      <div className="App">
        <TriviaGame></TriviaGame>
      </div>
    );
  }
}

export default App;
