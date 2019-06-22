import React from 'react'
import Question from './Question';
import TriviaService from './TriviaService';
import GameHeader from './GameHeader';
import './trivia-game.css';
require('../StringExtensions');

class TriviaGame extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          nQuestions: 10, 
          score: 0,
          nCorrect: 0,
          nIncorrect: 0,
          currentQuestion: 0,
          gameQuestions: [],
          allQuestions: []
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
            updateScore={this.updateScore}>
          </Question>
        );
      }

      this.setState({gameQuestions: questionArr});
  }


  updateScore(isCorrect) {
    this.setState({
      score: isCorrect ? this.state.score + 1 : this.state.score,
      currentQuestion: this.state.currentQuestion + 1,
      nCorrect: isCorrect ? this.state.nCorrect + 1 : this.state.nCorrect, 
      nIncorrect: !isCorrect ? this.state.nIncorrect + 1 : this.state.nIncorrect 
    });
  }

  render() {
    return (
      <div className="game-container">
        <GameHeader
          currentQuestion={this.state.currentQuestion + 1}
          nIncorrect={this.state.nIncorrect}
          nCorrect={this.state.nCorrect}
          score={this.state.score}>
        </GameHeader>
        {this.state.gameQuestions[this.state.currentQuestion]}
      </div>
    );
  }

}

export default TriviaGame;