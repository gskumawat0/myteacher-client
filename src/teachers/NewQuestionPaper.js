import React, { Component } from 'react';
import { apiCall } from '../apiCall';
import { QuestionsForm, QuestionPaperInfoForm } from './QuestionPaperForms'


const initialState = {

}
class NewQuestionPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            standard: '',
            subject: '',
            totalMarks: 0,
            totalQuestions: 0,
            questions: [],
            assignedTo: '',
            lastDate: '',
            question: '',
            answerType: 'single',
            options: [''],
            answers: []
        }
    }

    handleOptionChange = (idx, e) => {
        let newOptions = this.state.options;
        newOptions[idx] = e.target.value
        this.setState({
            options: newOptions
        });
    }

    handleAnswerChange = (e) => {
        let { answers } = this.state;
        if (answers.includes(e.target.value)) { //remove pre selected answer
            this.setState({
                answers: answers.filter((answer) => answer !== e.target.value)
            })
        }
        else {
            this.setState({ //add if not selected earlier
                answers: [...answers, e.target.value]
            });
        }
    }

    handleOptionAppend = (e) => {
        this.setState({
            options: [...this.state.options, '']
        })
    }

    handleOptionRemove = (idx, e) => {
        let { options } = this.state;
        if (options.length < 2) return false;
        this.setState({
            options: options.filter((option, i) => i !== idx)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleQuestionSubmit = (e) => {
        e.preventDefault();
        this.props.removeError();
        let { question, answerType, answers, options } = this.state;
        answers = answers.map(answer => answer.trim());
        options = options.map(option => option.trim());
        if (options.length < 2) {
            this.props.addError('please provide at least 2 options.');
            return false;
        }
        if (answers.length < 1) {
            this.props.addError('please select at least one answer.');
            return false;
        }

        if (answerType === 'single' && answers.length > 1) {
            this.props.addError('please enter only one answer for single answer type question.');
            return false;
        }

        let newQuestion = {
            question,
            answerType,
            options,
            answers
        };

        this.setState({ //clear question input
            questions: [...this.state.questions, newQuestion],
            options: [''],
            answers: [],
            question: '',
            answerType: 'single'
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

        apiCall('post', `${process.env.REACT_APP_BASE_URL}/api/questionpapers`, { standard, subject, totalMarks, totalQuestions, questions, assignedTo, lastDate })
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
                        <h2 className='text-center my-2 h3'> Question {this.state.questions.length + 1}</h2>
                        <QuestionsForm {...this.state} handleQuestionSubmit={this.handleQuestionSubmit} handleChange={this.handleChange} handleOptionChange={this.handleOptionChange} handleOptionAppend={this.handleOptionAppend} handleOptionRemove={this.handleOptionRemove} handleAnswerChange={this.handleAnswerChange}/>
                    </div>
                </div>
            </div> :
            <p className='h2'>Submitting....</p>
        )
    }
}

export default NewQuestionPaper;
