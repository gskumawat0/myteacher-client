import React, { Component } from 'react';
import QuestionPapersTable from '../teachers/QuestionPapersTable'
import { apiCall } from '../apiCall';
// import { Link } from 'react-router-dom';


class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questionPapers: ''
        };
    }
    componentDidMount() {
        this.props.removeError();
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/responses`, undefined) //fetch all question set
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
                this.props.addError(err.message || 'something went wrong. please try again later.')
            });
    }

    render() {
        let { isLoading, questionPapers } = this.state;
        let dashboard = questionPapers ? questionPapers.length > 0 
            ? <QuestionPapersTable  questionPapers={questionPapers} isStudent={true} /> 
            : <div className='bg-success h2 p-1' >Wow!! No question paper for you.</div> 
            : null;
        return (
            <div className='mt-2'>
                {isLoading ? <p className='h1'>Loading......</p> : dashboard}
            </div>
        )
    }
}


export default StudentDashboard;