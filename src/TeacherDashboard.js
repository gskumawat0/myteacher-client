import React, { Component } from 'react';
import QuestionPaperInfo from './QuestionPaperInfo'
import { apiCall } from './apiCall';
import { Link } from 'react-router-dom';


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
                debugger
                this.setState({
                    isLoading: false
                })
                return this.props.addError(err.message || 'an error occured while processing your request. please try again later.')

            });
    }


    render() {
        let { isLoading, questionPapers } = this.state;
        let dashboard = questionPapers ? questionPapers.length > 0 ?
            <QuestionPaperInfo  questionPapers={questionPapers} /> :
            <div className='bg-danger'>No question set found. please create one.</div> :
            null;
        return (
            <div className='mt-2'>
                {isLoading ? <p className='h1'>Loading......</p> : dashboard}
                <Link to='/teachers/newquestionpaper' className='btn btn-warning'>Add a new Question paper</Link>
            </div>
        )
    }
}

export default TeacherDashboard;
