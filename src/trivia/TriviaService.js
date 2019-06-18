const axios = require('axios');

class TriviaService {
    constructor() {
        this.allQuestionsUri = "http://localhost:5000/api/v1/allquestions";
    }
    
    getData() {
        return axios.get(this.allQuestionsUri);
    }
}

export default TriviaService;