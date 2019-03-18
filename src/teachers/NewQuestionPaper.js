import React, { Component } from 'react';
import { apiCall } from '../apiCall';
import { QuestionsForm, QuestionPaperInfoForm } from './QuestionPaperForms'


const initialState = {
    standard: '',
    subject: '',
    totalMarks: 0,
    totalQuestions: 0,
    questions: [],
    question: '',
    answerType: 'single',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    option6: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    assignedTo: '',
    lastDate: '',
    isSubmitting: false
}
class NewQuestionPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleQuestionSubmit = (e) => {
        e.preventDefault();
        this.props.removeError();
        let { question, answerType, option1, option2, option3, option4, option5, option6 } = this.state;
        let { answer1, answer2, answer3, answer4 } = this.state;
        let answers = [answer1, answer2, answer3, answer4].filter((ans) => ans !== ''); //remove empty answers
        let options = [option1.trim(), option2.trim(), option3.trim(), option4.trim(), option5.trim(), option6.trim()].filter((opt) => opt !== ''); //remove empty options

        if (answerType === 'single' && answers.length > 1) {
            this.props.addError('please enter only one answer for single answer type question.')
            return false;
        }
        if (!answers.every((ans) => options.includes(ans.trim()))) { // all answers must match from options
            this.props.addError('options must include all answers');
            return false;
        }

        let newQuestion = {
            question,
            answerType,
            options,
            answers
        };

        this.setState({ //clear question input
            ...initialState,
            questions: [...this.state.questions, newQuestion],
            standard: this.state.standard,
            subject: this.state.subject,
            totalMarks: this.state.totalMarks,
            totalQuestions: this.state.totalQuestions,
            lastDate: this.state.lastDate
        })
    }

    handleQuestionPaperSubmit = (e) => {
        e.preventDefault();
        this.props.removeError();

        let { standard, subject, totalMarks, totalQuestions, questions, lastDate, assignedTo } = this.state;

        //all questions are not submiited
        if (questions.length < Number(totalQuestions)) {
            this.props.addError(`please add remaining ${totalQuestions - questions.length} questions`);
            return false;
        }

        this.setState({
            isSubmitting: true
        })

        //update totalQuestion if it is less than total question submitted
        if (totalQuestions > questions.length + 1) {
            this.setState({
                totalQuestions: questions.length + 1
            })
        }

        apiCall('post', `${process.env.REACT_APP_BASE_URL}/api/questionpapers`, { standard, subject, totalMarks, totalQuestions, questions,assignedTo, lastDate })
            .then(data => {
                this.setState({ ...initialState })
                this.props.history.push(`/teachers`);
            })
            .catch(err => {
                this.setState({
                    isSubmitting: false
                })
                this.props.addError(err.message || 'an error occured while processing your request. please try after some time.');
                return false;
            });
    }
    componentDidMount() {
        this.props.removeError();
    }


    render() {
        return (!(this.state.isSubmitting) ?
            <div className='mt-4'>
                <h1 className='text-center mb-4' > Add New Question Paper </h1>
                <div className='row'>
                    <div className='col-md-8 mx-auto'>
                        <QuestionPaperInfoForm {...this.state} handleQuestionPaperSubmit={this.handleQuestionPaperSubmit} handleChange={this.handleChange}  />
                        <hr/>
                        <h2 className='text-center my-2'>Add Question:</h2>
                        <QuestionsForm {...this.state} handleQuestionSubmit={this.handleQuestionSubmit} handleChange={this.handleChange}/>
                    </div>
                </div>
            </div> :
            <p className='h2'>Submitting</p>
        )
    }
}

export default NewQuestionPaper;
