import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import FaStopwatch from "react-icons/fa";
import './question.css'


class Question extends PureComponent {
  
  static propTypes = {
      question: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.array.isRequired,
      updateScore: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.checkResponse = this.checkResponse.bind(this);
  }

  checkResponse(value) {
    this.props.updateScore(value === this.props.correct_answer.trim());
  }
    
  //Durstenfeld shuffle
  shuffleArray(arr) {
    for (let i = arr.length - 1 ; i > 0; i--) {
      let swapPos = Math.floor(Math.random() * i);
      let temp = arr[i];
      arr[i] = arr[swapPos];
      arr[swapPos] = temp;
    }
  }

  getAnswerOptions() {
    let count = 0;
    let answers = this.props.incorrect_answers.map(ia => {
      count += 1;
      ia = ia.trim();
      if (ia.search(/^'.*'$/) >= 0)  {
        ia = ia.substring(1, ia.length - 1);
      }
      return (
        <div key={`incorrect-${count}`} 
             className="answer-pane" 
             onClick={() => this.checkResponse(ia)}
             dangerouslySetInnerHTML={{ __html: ia}}>      
        </div>
      );
    });
    
    answers.push(
      <div key="correct" 
           className="answer-pane" 
           onClick={() => this.checkResponse(this.props.correct_answer)}
           dangerouslySetInnerHTML={{ __html: this.props.correct_answer}}>
      </div>
    );

    this.shuffleArray(answers);
    return answers;
  }

  getDifficultyIcon() {
    return (
      <span>{this.props.difficulty}</span>
    );
  }

  render() {
    return (
      <div className="question-container">
        <div className="question-card">
          <div className="question-card-content">
            <div dangerouslySetInnerHTML={{ __html: this.props.question}}></div>
            <div className="question-category">
              <em>{this.props.category} ({this.getDifficultyIcon()})</em>
            </div>
          </div>
        </div>
        <div>{this.getAnswerOptions()}</div>
      </div>
    );
  }
}

export default Question;