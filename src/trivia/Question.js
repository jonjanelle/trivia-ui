import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import QuestionChoice from './QuestionChoice';
// import FaStopwatch from "react-icons/fa";
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
    this.state = {
      answerOptions: this.buildAnswerOptions(),
      feedbackMessage: "",
      timer: 10,
      timesUp: false

    }
    this.checkResponse = this.checkResponse.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    let timer = setInterval(() => {
      if (this.state.timer === 1) {
        clearInterval(timer);
        this.showTimesUp();
      } else {
        this.setState({
          timer: this.state.timer - 1
        });
      }
    }, 1000);
  }

  showTimesUp() {
    this.setState({timesUp: true, timer: 0});
    setTimeout(() => {
      this.checkResponse(null);
    }, 200);
  }

  checkResponse(value) {
    let isCorrect = value === this.props.correct_answer.trim();
    this.setState({feedbackMessage: isCorrect ? 'Correct!' : 'Incorrect'});
    this.revealAnswer(value);
    setTimeout(() => {
      this.setState({
        feedbackMessage: '',
        timer: 10,
        timesUp: false
      });
      this.props.updateScore(isCorrect);
    }, 2000);

  }

  revealAnswer(value) {
    const newAnswerOptions = this.state.answerOptions.map(ao => {
      if (ao.text === value || ao.isCorrect)
        ao.isBlinking = true;
      return ao;
    });
    
    this.setState({answerOptions: newAnswerOptions});
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

  buildAnswerOptions() {
    let count = 0;
    let answers = this.props.incorrect_answers.map(ia => {
      count += 1;
      ia = ia.trim();
      
      if (ia.search(/^'.*'$/) >= 0)  {
        ia = ia.substring(1, ia.length - 1);
      }

      return ({
        isCorrect: false,
        onClick: this.checkResponse,
        isBlinking: false,
        text: ia,
        key: `incorrect-${count}`});
    });
    
    answers.push({
      isCorrect: true,
      onClick: this.checkResponse,
      isBlinking: false,
      text: this.props.correct_answer,
      key: 'correct'});

    this.shuffleArray(answers);
    return answers;
  }

  getQuestionChoices() {
    return this.state.answerOptions.map(ao => 
      <QuestionChoice key={ao.key} 
        isCorrect={ao.isCorrect}
        isBlinking={ao.isBlinking}
        text={ao.text}
        onClick={this.checkResponse}>
      </QuestionChoice>
    );
  }

  getDifficultyIcon() {
    return (
      <span>{this.props.difficulty}</span>
    );
  }

  render() {
    return (
      <div className="question-container">
        {this.state.timer}
        <div className="question-card">
          <div className="question-card-content">
            <div dangerouslySetInnerHTML={{ __html: this.props.question}}></div>
            <div className="question-category">
              <em>{this.props.category} ({this.getDifficultyIcon()})</em>
            </div>
          </div>
        </div>
        <div>{this.getQuestionChoices()}</div>
        <div className="feedback-message">{this.state.feedbackMessage}</div>
      </div>
    );
  }
}

export default Question;