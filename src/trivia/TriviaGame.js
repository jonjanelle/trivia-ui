import React, { PureComponent } from 'react'
import Question from './Question';
import TriviaService from './TriviaService';
import './trivia-game.css'
require('../StringExtensions');

class TriviaGame extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
          nQuestions: 10, 
          score: 0,
          nCorrect: 0,
          nIncorrect: 0,
          currentQuestion: 0,
          gameQuestions: [],
          allQuestions: [],
          feedbackMessage: ""
      };

      let triviaService = new TriviaService();
      triviaService.getData().then((response) => {
        this.state.allQuestions = response.data.data;
        this.buildQuestionArray();
      });

      this.updateScore = this.updateScore.bind(this);
  }

  buildQuestionArray(allQuestions) {
      let questionArr = [];
      let multipleChoice = this.state.allQuestions.filter(q => q.type === "multiple");
      // shuffle questions (does not preserve order, doesn't matter in this case)
      let selected = multipleChoice.sort(() => 0.5 - Math.random()).slice(0, this.state.nQuestions);

      for (let i = 0; i < selected.length; i++) {
        questionArr.push(
            <Question
                key={`question${i}`}
                question={selected[i].question}
                category={selected[i].category}
                correct_answer={selected[i].correct_answer}
                incorrect_answers={selected[i].incorrect_answers.replaceAll(/[[\]]/, "").match(/'[^'"]*'/g)}
                difficulty={selected[i].difficulty}
                updateScore={this.updateScore}
            >
          </Question>
        );
      }

      this.setState({gameQuestions: questionArr});
  }

  getQuestionState() {
    if (this.state.currentQuestion === -1) {
      // Title screen / Start new game / options screen
    }
    else if (this.state.currentQuestion < this.state.gameQuestions.length) {
      // Show current question
      return this.state.gameQuestions[this.state.currentQuestion];
    } else {
      // Game summary / play again / return to title screen
      return (<div>Game Over</div>);
    }
  }

  updateScore(isCorrect) {
    this.setState({
      score: isCorrect ? this.state.score + 1 : this.state.score,
      currentQuestion: this.state.currentQuestion + 1,
      feedbackMessage: isCorrect ? "Correct!" : "Wrong.",
      nCorrect: isCorrect ? this.state.nCorrect + 1 : this.state.nCorrect, 
      nIncorrect: !isCorrect ? this.state.nIncorrect + 1 : this.state.nIncorrect 
    });
  }

  getHeader() {
    return (
      <div className="header">
        <div className="flex-container">
          <div className="flex-item text-left">
            Score: {this.state.score}
          </div>
          <div className="flex-item text-right">
            Correct: {this.state.nCorrect}&nbsp;&nbsp;
            Incorrect: {this.state.nIncorrect}
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <h2>
              Question {this.state.currentQuestion + 1}  
            </h2>
          </div>
        </div>
      </div>
    );
  }

  getFeedBackBar() {
    return (<div>{this.state.feedbackMessage}</div>);
  }

  render() {
    return (
      
      <div className="game-container">
        {this.getHeader()}
        {this.getQuestionState()}
        {this.getFeedBackBar()}
      </div>
    );
  }

}

export default TriviaGame;