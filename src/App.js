import React, { Component } from 'react';
import './App.css';
import TriviaGame from './trivia/TriviaGame';
import TriviaContainer from './trivia/TriviaContainer';


class App extends Component {
  render() {  
    return (
      <div className="App">
        <TriviaContainer></TriviaContainer>
        {/* <TriviaGame></TriviaGame> */}
      </div>
    );
  }
}

export default App;
