import React, { Component } from 'react';
import { apiCall } from '../apiCall';
import SingleQuestionResponse from './SingleQuestionResponse'
// import StudentInfoForm from './StudentInfoForm'

const QuestionNoPlate = (props)=>{
    let {questions, btnClickHandler} = props;
    let style = {width: `50px`, height: `50px`, 'borderRadius': '5px' }
    return (
        questions.map((question, idx)=>{
            return <button onClick={btnClickHandler} target-question-type={question.answerType} className='mx-1' key={question._id} id={question._id} style={style}>{idx + 1}</button>
        })
    )
} 




class StudentResponseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSubmitting: false,
            questionPaper: {},
            currentQuestion: 1,
            answerType:'',
            selectedOptions:[],
            lastDate: '',
            responses: {}
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
                        isSubmitting: false,
                        questionPaper: data.questionPaper,
                        answerType: data.questionPaper.questions[0].answerType
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                this.props.addError(err.message || 'something went wrong. please try again later.')

            });
    }

    handleChange = ( answerType, e) => {
        this.props.removeError();
        let { selectedOptions} = this.state;
        if(this.state.selectedOptions.includes(e.target.value)){
            selectedOptions = selectedOptions.filter((opt)=>opt !== e.target.value); 
        }
        else{
            selectedOptions = answerType ==='single'? [e.target.value] : [...selectedOptions, e.target.value];
        }
        this.setState({
            selectedOptions ,
        })
    }
    
    btnClickHandler = (e)=>{
        this.props.removeError();
        let selectedOptions = this.state.responses[this.state.questionPaper.questions[Number(e.target.innerText) - 1]._id] || [];
        this.setState({
            selectedOptions,
            currentQuestion: Number(e.target.innerText),
            answerType: e.target.attributes['target-question-type'].nodeValue
        })
    }
    
    handleSingleResponse = (questionId, e)=>{
        e.preventDefault();
        let {responses, currentQuestion, selectedOptions, questionPaper} = this.state;
        let nextQuestion = currentQuestion < questionPaper.questions.length ? currentQuestion + 1 : 1;
        
        if(selectedOptions.length < 1) {this.props.addError(`please choose a answer`); return false}
        
        this.setState({
            responses: {...responses, [questionPaper.questions[currentQuestion - 1]._id]:selectedOptions },
            currentQuestion: nextQuestion,
            answerType: questionPaper.questions[nextQuestion - 1].answerType,
            selectedOptions: responses[this.state.questionPaper.questions[nextQuestion - 1]._id] || []
        });
    }
    
    handleResponseSubmit = (e) => {
        e.preventDefault();
        this.props.removeError();
        this.setState({
            isSubmitting: true
        })

        apiCall('post', `${process.env.REACT_APP_BASE_URL}/api/responses`, { responses: this.state.responses, questionPaperId: this.state.questionPaper._id })
            .then(data => {
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        isSubmitting: false,
                    })
                    this.props.history.push('/students/');
                }
            })
            .catch(err => {
                this.setState({
                    isSubmitting: false
                })
                return this.props.addError(err.message || 'something went wrong. please try again later.')
            });
    }

    render() {
        let { questionPaper, currentQuestion, selectedOptions } = this.state;
        let questionBody = Object.keys(questionPaper).length > 0  
            ? <SingleQuestionResponse handleSingleResponse={this.handleSingleResponse} 
                handleChange={this.handleChange}
                selectedOptions={selectedOptions}
                currentQuestion={currentQuestion}
                question={questionPaper.questions[currentQuestion - 1]} />
            : <h2>Loading....</h2>;
        return (
            <div className='mt-2'>
                <h2 className='d-inline-block mx-5'>Subject: {questionPaper.subject}</h2>
                <h2 className='d-inline-block float-right mx-5'>Class: {questionPaper.standard}</h2>
                <br/>
                <p className='d-inline mx-5' >total marks: {questionPaper.totalMarks} </p>
                <p className='float-right d-inline mx-5' >total questions: {questionPaper.totalQuestions}</p>
                <hr className='mb-2'/>
                <h1 className='text-center my-3'>Questions:</h1>
                <div className='row'>
                    <div className='col-md-8'>
                        <form method='post' onSubmit={this.handleResponseSubmit}>
                            <ol>
                                {questionBody}
                            </ol>
                            <button type='submit' className='btn btn-primary float-right'>Submit Question Paper</button>
                        </form>
                    </div>
                    <div className='col-md-4 d-flex flex-wrap'>
                        {Object.keys(questionPaper).length > 0 && <QuestionNoPlate 
                            questions={questionPaper.questions} 
                            btnClickHandler={this.btnClickHandler} />}
                    </div>
                </div>
            </div>)
    }
}

export default StudentResponseForm;