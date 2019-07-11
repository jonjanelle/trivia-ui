import React from 'react';
import TriviaMenu from './TriviaMenu';
import TriviaGame from './TriviaGame';
import TriviaService from './TriviaService';
import './trivia-container.css'

const GameState = {
  MENU: 0,
  GAME: 1,
  OPTIONS: 2
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
        gameFilters: {},
        allQuestions: [], 
        categories: [],
        difficulties: [],
        isLoading: true
    };

    this.setGameState = this.setGameState.bind(this);
    this.setGameType = this.setGameType.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    let triviaService = new TriviaService();
    triviaService.getData().then((response) => {
      let categories = [];
      let difficulties = [];
      response.data.data.forEach(v => { 
        if (categories.indexOf(v.category) === -1)
          categories.push(v.category);
        if (difficulties.indexOf(v.difficulty) === -1)
          difficulties.push(v.difficulty);
      });
      this.setState({
        allQuestions: response.data.data,
        categories: categories.sort(),
        difficulties: difficulties,
        isLoading: false
      });
    });
  }
  
  setGameType(newType) {
    this.setState({gameType: newType});
  }

  setGameState(newState) {
    this.setState({gameState: newState});
  }

  startNewGame(gameFilters) {
    this.setState({
      gameState: GameState.GAME,
      gameFilters: gameFilters
    });
  }

  showMenu() {
    this.setGameState(GameState.MENU);
  }

  getStateComponent() {
    if (this.state.gameState === GameState.MENU) {
      return (
        <TriviaMenu
          onNewGame={this.startNewGame}
          categories={this.state.categories}
          difficulties={this.state.difficulties}
          isLoading={this.state.isLoading}>
        </TriviaMenu>
      );
    } else if (this.state.gameState === GameState.GAME) {
      return (
        <TriviaGame
          allQuestions={this.state.allQuestions}
          onNewGame={this.startNewGame}
          onShowMenu={this.showMenu}
          gameType={this.state.gameType}
          gameFilters={this.state.gameFilters}>
        </TriviaGame>
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? 'Loading...' : this.getStateComponent()}
      </div>
    );
  }
}

export default TriviaContainer;