import React, { Component } from 'react';
import { apiCall } from './apiCall';
import SingleQuestion from './SingleQuestion'

class QuestionPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questionPaper: {}
        };
    }
    componentDidMount() {
        this.props.removeError();
        // fetch a question paper by it's id
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/questionpapers/${this.props.match.params.questionPaperId}`, undefined)
            .then(data => {
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        questionPaper: data.questionPaper
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                return this.props.addError(err.message || 'an error occured while processing your request. please try again later.')

            });
    }

    render() {
        let { questionPaper } = this.state;
        let questionList = Object.keys(questionPaper).length > 0 ? questionPaper.questions.map((question, i) => {
            return (
                <li key={question._id || i}>
                <SingleQuestion question={question} />
            </li>);
        }) : <h2>Loading....</h2>;
        return <div className='mt-2'>
            <h2 className='d-inline-block mx-5'>Subject: {questionPaper.subject}</h2>
            <h2 className='d-inline-block float-right mx-5'>Class: {questionPaper.standard}</h2>
            <br/>
            <p className='d-inline mx-5' >total marks: {questionPaper.totalMarks} </p>
            <p className='float-right d-inline mx-5' >total questions: {questionPaper.totalQuestions}</p>
            <hr className='mb-2'/>
            <ol>
                {questionList}
            </ol>
        </div>
    }
}

export default QuestionPaper;
