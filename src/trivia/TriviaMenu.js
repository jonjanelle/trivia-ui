import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './question.css'

class TrviaMenu extends PureComponent {
  

  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    //
  }

  // TODO: 
  // * multi-select for choosing categories
  // * Input for number of questions (10-100)
  // * Button to start new game
  // * Way to display state of previous game
  
  

  render() {
    return (
      <div className="question-container">

      </div>
    );
  }
}

export default TrviaMenu;