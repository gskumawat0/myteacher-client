import React, {Component} from 'react';
import {apiCall} from '../apiCall';
import ScoreCardTable from './ScoreCardTable';

class StudentScoreBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            StudentScores: [],
            isLoading: true,
            questionPaper: {}
        }
    }
    componentDidMount(){
        this.props.removeError();
        debugger
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/questionpapers/${this.props.match.params.questionPaperId}/scores`, undefined)
        .then(data =>{
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        questionPaper: data.questionPaper,
                        studentScores: data.studentScores
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
    render(){
        let {questionPaper, studentScores, isLoading} = this.state;
        let scoresList = !isLoading 
            ? studentScores.length < 1 ? <div className='bg-info text-danger'> No respone submitted</div>
            : <ScoreCardTable studentScores={studentScores} /> : <h2>Loading....</h2>;
        return (
            <div className='mt-2'>
                <h2 className='d-inline-block mx-5'>Subject: {questionPaper.subject}</h2>
                <h2 className='d-inline-block float-right mx-5'>Class: {questionPaper.standard}</h2>
                <br/>
                <p className='d-inline mx-5' >total marks: {questionPaper.totalMarks} </p>
                <p className='float-right d-inline mx-5' >total questions: {questionPaper.totalQuestions}</p>
                <hr className='mb-2'/>
                <ol>
                    {scoresList}
                </ol>
            </div>)
    }
}
export default StudentScoreBoard;