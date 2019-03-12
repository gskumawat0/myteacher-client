import React, { Component } from 'react';
import './QuestionPaper.css';

import AddQuestionForm from './AddQuestionForm';

class QuestionPaper extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let { questions } = this.props;
        let questionList = questions.map((question, i) => {
            return <li key={i}> {question}</li>
        })
        return <div className='mt-2'>
            <AddQuestionForm />
            <ol>
                {questionList}
            </ol>
        </div>
    }
}

export default QuestionPaper;
