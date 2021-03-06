import React, { Component } from 'react';
import QuestionPapersTable from './QuestionPapersTable'
import { apiCall } from '../apiCall';
import { Link, withRouter } from 'react-router-dom';


class TeacherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questionPapers: ''
        };
    }
    componentDidMount() {
        this.props.removeError();
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/questionpapers`, undefined) //fetch all question set
            .then(data => {
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        questionPapers: data.questionPapers
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
                this.props.addError(err.message || 'something went wrong. please try again later.');
                if(err.status === 401) this.props.history.push('/auth/signin');
            });
    }

    deleteQuestionPaper = (questionPaperId) => {
        apiCall('delete', `${process.env.REACT_APP_BASE_URL}/api/questionpapers/${questionPaperId}`, undefined)
        .then(data => {
            if (!data.success) {
                throw Error(data.message);
            }
            else {
                this.setState({
                    questionPapers: this.state.questionPapers.filter((questionPaper) => questionPaper._id !== questionPaperId)
                })
            }
        })
        .catch(err => {
            this.props.addError(err.message || 'something went wrong. please try again later.')
        });
    }


    render() {
        let { isLoading, questionPapers } = this.state;
        let dashboard = !isLoading ? questionPapers.length > 0 ?
            <QuestionPapersTable  questionPapers={questionPapers} deleteQuestionPaper={this.deleteQuestionPaper} isStudent={false} /> :
            <div className='bg-danger h2 p-1' >No question paper found. please create one.</div> :
            <h2>Loading....</h2>;
        return (
            <div className='mt-2'>
                {dashboard}
                <Link to='/teachers/newquestionpaper' className='btn btn-warning'>Add a new Question paper</Link>
            </div>
        )
    }
}

export default withRouter(TeacherDashboard);
