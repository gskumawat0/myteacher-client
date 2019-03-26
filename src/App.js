import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom'

import Homepage from './Homepage';
import AuthForm from './auth/AuthForm';
import withAuth from './hocs/WithAuth';
// import { apiCall } from './apiCall';

//teacher component
import QuestionPaper from './teachers/QuestionPaper.js';
import TeacherDashboard from './teachers/TeacherDashboard';
import NewQuestionPaper from './teachers/NewQuestionPaper';
import StudentScoreBoard from './teachers/StudentScoreBoard';

//student component
import StudentDashboard from './students/StudentDashboard';
import StudentResponseForm from './students/StudentResponseForm';

const Nav = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <Link className="navbar-brand mb-0 ml-md-5 h1" to='/'>MyTeacher</Link>
            { window.localStorage.jwtToken && <ul className="navbar-nav ml-auto mb-0 mr-md-5">
              <li className="nav-item active">
                <p className="nav-link mb-0" onClick={props.onLogOut}>Logout</p>
              </li>
            </ul>}
        </nav>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            success: ''
        };

    }

    //show  error
    addError = (error) => {
        this.setState({
            error
        });

    }
    removeError = () => {
        this.setState({
            error: ''
        })
    }

    //show success
    addSuccess = (success) => {
        this.setState({
            success
        })
    }
    removeSuccess = () => {
        this.setState({
            success: ''
        })
    }
    onLogOut = (e) => {
        e.preventDefault();
        delete window.localStorage.jwtToken;
        this.addSuccess('logout successful. please signin back to continue. ')
        this.props.history.push('/auth/signin');
    }


    render() {
        const WithAuthHomepage = withAuth(Homepage);
        // const WithAuthTeacherDashboard = withAuth(TeacherDashboard);
        let { error, success } = this.state;
        let errmsg = error && error !== '' &&
            <div className="alert mb-0 alert-danger alert-dismissible fade show"  role="alert">
                {error}
                <button type="button" onClick = {this.removeError} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>;

        let successmsg = success && success !== '' &&
            <div className="alert mb-0 alert-success alert-dismissible fade show"  role="alert">
                {success}
                <button type="button" onClick = {this.removeSuccess} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>;

        return (
            <div className="App">
                <Nav onLogOut={this.onLogOut} />
                <div className='container'>
                  { errmsg }
                  {successmsg}
                </div>
                <div className='container mt-2'>
                    <Switch>
                        <Route exact path='/' render={(props)=><WithAuthHomepage {...props} addError={this.addError} removeError={this.removeError} />} />
                        <Route exact path='/auth/signup' render={props =><AuthForm 
                            submitText='Sign up Now' 
                            headText="Sign up" 
                            type='signup' 
                            addError={this.addError} removeError={this.removeError}
                            addSuccess={this.addSuccess} removeSuccess={this.removeSuccess}
                            />}  />
                        <Route exact path='/auth/signin' render={props =><AuthForm 
                            submitText='Login' 
                            headText="Welcome Back" 
                            type='signin' 
                            addError={this.addError} removeError={this.removeError}
                            addSuccess={this.addSuccess} removeSuccess={this.removeSuccess}
                        />} />
                        <Route exact path='/teachers/' render={ props => <TeacherDashboard addError={this.addError} removeError={this.removeError}/>} />
                        <Route exact path='/teachers/newquestionpaper' render={props=><NewQuestionPaper {...props} addError={this.addError} removeError={this.removeError} /> } />
                        <Route exact  path='/teachers/:questionPaperId' render={props =>
                             <QuestionPaper {...props} addError={this.addError} removeError={this.removeError}/>
                          }
                        />
                        <Route exact path='/teachers/:questionPaperId/scores' render={props=>
                            <StudentScoreBoard {...props} addError={this.addError} removeError={this.removeError}/>
                        }  />
                        
                        <Route exact path='/students' render={props=><StudentDashboard addError={this.addError} removeError={this.removeError} />} />
                        <Route exact path='/students/:questionPaperId' render={props =>
                             <StudentResponseForm {...props} addError={this.addError} removeError={this.removeError}/>
                          }
                        />
                    </Switch>
                </div>
              </div>
        );
    }
}

export default withRouter(App);
