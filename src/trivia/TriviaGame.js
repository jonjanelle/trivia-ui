import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

import GameHeader from './GameHeader';
import './trivia-game.css';
import GameOver from './GameOver';
require('../StringExtensions');

class TriviaGame extends React.Component {
  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
    onShowMenu: PropTypes.func.isRequired,
    gameType: PropTypes.number.isRequired,
    allQuestions: PropTypes.array.isRequired,
    gameFilters: PropTypes.object.isRequired
  };

  constructor(props) {
      super(props);
      this.state = {
          score: 0,
          nCorrect: 0,
          nIncorrect: 0,
          currentQuestion: 0,
          gameQuestions: []
      };

      
      this.updateScore = this.updateScore.bind(this);
      this.questionFilter = this.questionFilter.bind(this);
  }
  
  componentDidMount() {
    this.buildQuestionArray();
  }

  buildQuestionArray() {
      let questionArr = [];
      let multipleChoice = this.props.allQuestions.filter(this.questionFilter);

      // shuffle questions (does not preserve order, doesn't matter in this case)
      let selected = multipleChoice.sort(() => 0.5 - Math.random()).slice(0, this.props.gameFilters.questions);

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

  questionFilter(item) {
    if (item.type !== "multiple") {
      return false;
    }

    let categoryCheck = [true];
    if (this.props.gameFilters.categories.length > 0) {
      categoryCheck = this.props.gameFilters.categories.map(c => item.category === c);
    }

    let difficultyCheck = [true];
    if (this.props.gameFilters.difficulties.length > 0) {
      difficultyCheck = this.props.gameFilters.difficulties.map(d => item.difficulty === d); 
    }

    return categoryCheck.indexOf(true) >= 0 && difficultyCheck.indexOf(true) >= 0;
  }

  updateScore(isCorrect) {
    this.setState({
      score: isCorrect ? this.state.score + 1 : this.state.score,
      currentQuestion: this.state.currentQuestion + 1,
      nCorrect: isCorrect ? this.state.nCorrect + 1 : this.state.nCorrect, 
      nIncorrect: !isCorrect ? this.state.nIncorrect + 1 : this.state.nIncorrect 
    });
  }

  showQuestions() {
    if (this.state.currentQuestion <= this.state.gameQuestions.length) {
      return this.state.gameQuestions[this.state.currentQuestion];
    } else {
      return (
        <GameOver
          nCorrect={this.state.nCorrect}
          totalQuestions={this.state.gameQuestions.length + 1}>
        </GameOver>
      );
    }
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
        {this.showQuestions()}
      </div>
    );
  }

}

export default TriviaGame;