import React, { Component } from 'react';
import './QuestionPaper.css';
import { apiCall } from './apiCall';
import SingleQuestion from './SingleQuestion'

class QuestionPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questionSet: ''
        };
    }
    componentDidMount() {
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/questionset/${this.props.params.questionSetId}`, undefined)
            // apiCall('get', `https://randomuser.me/api/`, undefined)
            .then(data => {
                console.log(data);
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        questionSet: data.questionSet
                    })
                }
            })
            .catch(err => {
                debugger
                console.log(err);
                this.setState({
                    isLoading: false
                })
                return this.props.addError(err.message || err)

            });
    }

    render() {
        let { questionSet } = this.props;
        let questionList = questionSet.questions.map((question, i) => {
            return (
                <li key={question._id || i}>
                <SingleQuestion question={question} />
            </li>)
        })
        return <div className='mt-2'>
            <ol>
                {questionList}
            </ol>
        </div>
    }
}

export default QuestionPaper;
