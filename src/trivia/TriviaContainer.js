import React from 'react';
import TriviaMenu from './TriviaMenu';
import TriviaGame from './TriviaGame';

const GameState = {
  MENU: 0,
  GAME: 1,
  GAMEOVER: 2,
  OPTIONS: 3
};

const GameType = {
  NORMAL: 0,
  TIMED: 1
};

class TriviaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        gameState: GameState.MENU,
        gameType: GameType.NORMAL,
        gameParams: {}
    };

    this.setGameState = this.setGameState.bind(this);
    this.setGameType = this.setGameType.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.showGameOver = this.showGameOver.bind(this);
  }  

  
  setGameType(newType) {
    this.setState({gameType: newType});
  }

  setGameState(newState) {
    this.setState({gameState: newState});
  }

  startNewGame() {
    this.setGameState(GameState.GAME);
  }

  showGameOver() {
    this.setGameState(GameState.GAMEOVER);
  }

  getStateComponent() {
      if (this.state.gameState === GameState.MENU) {
        return (
          <TriviaMenu
            newGame={this.startNewGame}>
          </TriviaMenu>
        
        );
      } else if (this.state.gameState === GameState.GAME) {
        return (
          <TriviaGame
            onGameOver={this.showGameOver} 
            gameType={this.state.GameType}>
          </TriviaGame>
        );
      }
  }


  render() {
    return (
      <div>
        {this.getStateComponent()}
      </div>
    );
  }
}

export default TriviaContainer;