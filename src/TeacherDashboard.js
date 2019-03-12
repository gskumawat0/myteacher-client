import React, { Component } from 'react';
import './TeacherDashboard.css';
import QuestionSetInfo from './QuestionSetInfo'
import { apiCall } from './apiCall';

class TeacherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questionSets: ''
        };
    }
    componentDidMount() {
        apiCall('get', `${process.env.REACT_APP_BASE_URL}/api/questionset`, undefined)
            // apiCall('get', `https://randomuser.me/api/`, undefined)
            .then(data => {
                console.log(data);
                if (!data.success) {
                    throw Error(data.message);
                }
                else {
                    this.setState({
                        isLoading: false,
                        questionSets: data.questionSets
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
        let { isLoading, questionSets } = this.state;
        let dashboard = questionSets ? questionSets.length > 0 ?
            <QuestionSetInfo  questionSets={questionSets} /> :
            <div className='bg-danger'>No question set found. please create one.</div> :
            null;
        return (
            <div className='mt-2'>
                {isLoading ? <p className='h1'>Loading......</p> : dashboard}
            </div>
        )
    }
}

export default TeacherDashboard;
