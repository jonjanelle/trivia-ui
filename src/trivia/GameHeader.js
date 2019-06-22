import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
//https://react-icons.netlify.com/#/icons/fa
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import './gameheader.css'

//PureComponent assumes that a component will always produce the same output for a particular
//set of inputs (is a function). More efficient as possible
class GameHeader extends PureComponent {
  static propTypes = {
      nCorrect: PropTypes.number.isRequired,
      nIncorrect: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      currentQuestion: PropTypes.number.isRequired,
  };

  render() {
    return (
        <div className="header">
            <div className="flex-container">
            <div className="flex-item text-left">
                <span className="green label">
                Score: {this.props.score}
                </span> 
            </div>
            <div className="flex-item text-right">
                <span className="green label">
                <FaCheck className="fa-icon" /> {this.props.nCorrect}
                </span>
                <span className="red label">
                <FaTimes className="fa-icon" /> {this.props.nIncorrect}
                </span>
            </div>
            </div>
            <div className="flex-container">
                <div className="flex-item">
                    <h2>Question {this.props.currentQuestion}</h2>
                </div>
            </div>
        </div>    
    );
  }
}

export default GameHeader;