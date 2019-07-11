import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import './trivia-menu.css';

class TrviaMenu extends PureComponent {
  
  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    difficulties: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      selectedDifficulties: [],
      selectedQuestionCount: {value: 10, label: 10},
      categories: this.props.categories.map(c => ({value: c, label: c})),
      difficulties: this.props.difficulties.map(d => ({value: d, label: d}))
    };
    
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }

  // TODO: 
  // * Way to display state of previous game

  onNewGame() {
    let gameFilters = {
      categories: this.state.selectedCategories.map(c => c.value),
      difficulties: this.state.selectedDifficulties.map(d => d.value),
      questions: this.state.selectedQuestionCount.value
    };

    this.props.onNewGame(gameFilters);
  }

  onCategorySelect = categories => this.setState({ selectedCategories: categories });
  onQuestionCountSelect = count => this.setState({selectedQuestionCount: count});
  onDifficultySelect = difficulties => this.setState({ selectedDifficulties: difficulties }); 

  render() {
    const questionCounts = [
      {value: 10, label: 10},
      {value: 20, label: 20},
      {value: 30, label: 30}
    ];

    return (
      <div className="menu-container">
        <div className="menu-title trance">TRIVIA GAME</div>
        <div className="game-options">
          <div className="options-title">
            OPTIONS
          </div>
          <div className="flex-container mb-1">
            <div className="flex-item">
              <span className="options-subtitle">
                CATEGORIES
              </span>
              <Select
                placeholder="All"
                className="category-select p-8"
                value={this.state.selectedCategories}
                onChange={this.onCategorySelect}
                options={this.state.categories}
                isMulti
              />
            </div>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              <span className="options-subtitle">
               QUESTIONS
              </span>
              <Select
                placeholder="Question count"
                className="category-select p-8"
                value={this.state.selectedQuestionCount}
                onChange={this.onQuestionCountSelect}
                options={questionCounts}
              />
            </div>
            <div className="flex-item">
              <span className="options-subtitle">
                DIFFICULTIES
              </span>
              <Select
                placeholder="All"
                className="category-select p-8"
                value={this.state.selectedDifficulties}
                onChange={this.onDifficultySelect}
                options={this.state.difficulties}
                isMulti
              />
            </div>
          </div>
        </div>
        <button className="wiggle-button mt-2" onClick={this.onNewGame}>START GAME</button>
      </div>
    );
  }
}

export default TrviaMenu;