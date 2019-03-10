import React, { Component } from 'react';
import './QuestionPaper.css';
import QuestionForm from './QuestionForm';

class QuestionPaper extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let { questions } = this.props;
        let questionList = questions.map((question, i) => {
            return <li key={i}> {question}</li>
        })
        return <div>
            <QuestionForm />
            <ol>
                {questionList}
            </ol>
        </div>
    }
}

export default QuestionPaper;
