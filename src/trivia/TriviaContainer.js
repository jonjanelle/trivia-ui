import React from 'react';

class TriviaContainer extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          gameState: 0
      };
  }  

  // TODO: 
  // * Coordinate which game state is shown (menu or game [future: which type of game])
  
  getStateComponent() {
      //both will need access to setGameState
      if (this.state.gameState === 0) {
          //return menu
      } else if (this.state.gameState === 1) {
          // return TriviaGame component
      }
  }

  setGameState() {

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