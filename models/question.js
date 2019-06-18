export class Question {

    constructor(question, category, difficulty, correct_answer, incorrect_answers) {
        this.question = question;
        this.category = category;
        this.difficulty = difficulty;
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
    }
}