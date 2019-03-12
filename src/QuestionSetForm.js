import React, { Component } from 'react';
// import { withRouter } from 'react-router'
import { apiCall } from './apiCall';
// import $ from 'jquery';

const initialState = {
    standard: '',
    subject: '',
    totalMarks: 0,
    totalQuestions: 0,
    questions: [],
    question: '',
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
}
class QuestionSetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        debugger
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleQuestionSubmit = (e) => {
        e.preventDefault();
        let { question, answerType, option1, option2, option3, option4, option5, option6 } = this.state;
        let { answer1, answer2, answer3, answer4 } = this.state;
        let newQuestion = {
            question,
            answerType,
            options: [option1, option2, option3, option4, option5, option6].filter((opt) => opt !== ''), //remove empty options
            answers: [answer1, answer2, answer3, answer4].filter((ans) => ans !== '') //remove empty answers
        }
        debugger
        this.setState({
            ...initialState,
            questions: [...this.state.questions, newQuestion],
            standard: this.state.standard,
            subject: this.state.subject,
            totalMarks: this.state.totalMarks,
            totalQuestions: this.state.totalQuestions,
        })
    }

    handleQuestionSetSubmit = (e) => {
        e.preventDefault();
        let { standard, subject, totalMarks, totalQuestions, questions } = this.state;
        debugger
        if (questions.length !== Number(totalQuestions)) {
            this.props.addError(`please add remaining ${totalQuestions - questions.length} questions`);
            return false;
        }
        apiCall('post', `${process.env.REACT_APP_BASE_URL}/api/questionset`, { standard, subject, totalMarks, totalQuestions, questions })
            .then(data => {
                console.log(data);
                this.setState({ ...initialState })
                this.props.history.push(`/teachers`);
            })
            .catch(err => {
                debugger
                console.log(err);
                return this.props.addError(err.message || err);

            });
    }


    render() {
        let { totalQuestions, totalMarks, questions } = this.state;
        let { question, option1, option2, option3, option4, option5, option6 } = this.state;
        let { answer1, answer2, answer3, answer4 } = this.state;
        return (
            <div className='mt-4'>
                <h1 className='text-center mb-4'>Add New Question Paper </h1>
                <div className='row'>
                    <div className='col-md-8 mx-auto'>
                        <form onSubmit={this.handleQuestionSetSubmit} method='post'>
                          <div className="form-group">
                            <label htmlFor="standard">Standard:</label>
                            <select onChange={this.handleChange} name='standard' id='standard' className='form-control' required>
                                <option value='' >choose a class</option>
                                <option value='VI' >VI</option>
                                <option value='VII'>VII</option>
                                <option value='VIII'>VIII</option>
                                <option value='IX'>IX</option>
                                <option value='X'>X</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="subject" >Subject:</label>
                            <select onChange={this.handleChange} id='subject' name='subject' className='form-control' required>
                                <option value=''>choose a subject</option>
                                <option value='english'>english</option>
                                <option value='science'>science</option>
                                <option value='geography'>geography</option>
                                <option value='history'>history</option>
                                <option value='sports'>sports</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="marks">Total marks:</label>
                            <input type="number" onChange={this.handleChange} value={totalMarks} name='totalMarks' className="form-control" id="marks" placeholder="total marks" required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="marks">Total questions:</label>
                            <input type="number" onChange={this.handleChange} value={totalQuestions} name='totalQuestions' className="form-control" id="marks" placeholder="total questions" required/>
                          </div>
                          <button type="submit" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Submit after adding all questions">Submit Question Paper</button>
                        </form>
                        <hr/>
                        <h2 className='text-center my-2'>Add Question:</h2>
                        <form onSubmit={this.handleQuestionSubmit} method='post'>
                          <p className='float-right'>Questions remaining: {totalQuestions - questions.length} </p>    
                          <p className='mb-0 ml-md-2'>Select answer type:</p>
                            <div className="form-check ml-md-4">
                              <input className="form-check-input" type="radio" name="answerType" id="single" onChange={this.handleChange} value="single" required/>
                              <label className="form-check-label mr-3" htmlFor="single">
                                single answer type
                              </label>
                              <input className="form-check-input ml-4" type="radio" name="answerType" onChange={this.handleChange} id="multiple" value="multiple" required/>
                              <label className="form-check-label mx-5" htmlFor="multiple">
                                multiple answer type
                              </label>
                            </div>
                            <div className="form-group mt-1">
                              <label className="" htmlFor="question">
                                Question:
                              </label>
                              <input type='text' name='question' id='question' value={question} onChange={this.handleChange} placeholder='question'    className='form-control' required/>
                            </div>
                            <div className='form-group' id='options'>
                              <p className='mb-0 ml-md-2'>Options:</p>
                                <input type='text' name='option1' value={option1}  onChange={this.handleChange} placeholder='option 1'  className='form-control  my-1' required/> 
                                <input type='text' name='option2' value={option2} onChange={this.handleChange} placeholder='option 2'  className='form-control  my-1' required/> 
                                <input type='text' name='option3' value={option3} onChange={this.handleChange} placeholder='option 3'  className='form-control  my-1' required/> 
                                <input type='text' name='option4' value={option4} onChange={this.handleChange} placeholder='option 4' className='form-control  my-1' required/> 
                                <input type='text' name='option5' value={option5} onChange={this.handleChange} placeholder='option 5(optional)' className='form-control  my-1'/> 
                                <input type='text' name='option6' value={option6} onChange={this.handleChange} placeholder='option 6(optional)' className='form-control  my-1'/> 
                                <small>Max.6 option allowed</small>
                            </div>
                            <div className='form-group' id='answers'>
                                <p className='mb-0 ml-md-2'>Answers:</p>
                                <input type='text' name='answer1' value={answer1} onChange={this.handleChange} placeholder='answer 1(required)' className='form-control my-1' required/>
                                <input type='text' name='answer2' value={answer2} onChange={this.handleChange} placeholder='answer 2(optional)' className='form-control my-1' />
                                <input type='text' name='answer3' value={answer3} onChange={this.handleChange} placeholder='answer 3(optional)' className='form-control my-1' />
                                <input type='text' name='answer4' value={answer4} onChange={this.handleChange} placeholder='answer 4(optional)' className='form-control my-1' />
                            </div>
                          <button type="submit" className="btn btn-primary mb-3" >Submit Question</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionSetForm;
