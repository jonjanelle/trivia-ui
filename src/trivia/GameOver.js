import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
//https://react-icons.netlify.com/#/icons/fa
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

class GameOver extends PureComponent {
  static propTypes = {
      nCorrect: PropTypes.number.isRequired,
      totalQuestions: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired
  };


  getMessage() {
    
  }


  render() {
    return (
        <div>
            <div>Game over!</div>
            <div>Correct: {this.props.nCorrect}</div>
            <div>Incorrect: {this.props.totalQuestions - this.props.nCorrect}</div>
            <div>Score: {this.props.score}</div>
            <div>
                <button>Return to menu</button>
                <button>Play Again</button>
            </div>
            <div></div>

        </div>    
    );
  }
}

export default GameOver;