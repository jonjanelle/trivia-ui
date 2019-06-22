import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './question.css'

class TrviaMenu extends PureComponent {
  
  static propTypes = {
    newGame: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      gameFilters: [],
      difficulty: []      
    };
  }


  // TODO: 
  // * multi-select for choosing categories
  // * Input for number of questions (10-100)
  // * Button to start new game
  // * Way to display state of previous game
  
  
  render() {
    return (
      <div className="question-container">
        <button onClick={this.props.newGame}>Start Game</button>
      </div>
    );
  }
}

export default TrviaMenu;