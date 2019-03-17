import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import QuestionPaper from './teachers/QuestionPaper.js';
import TeacherDashboard from './teachers/TeacherDashboard'
import NewQuestionPaper from './teachers/NewQuestionPaper'
import Homepage from './Homepage';
import TeacherAuthForm from './auth/TeacherAuthForm';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <span className="navbar-brand mb-0 ml-md-5 h1">MyTeacher</span>
        </nav>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            success: ''
        };

    }

    //add a error
    addError = (error) => {
        this.setState({
            error
        });

    }
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

    removeError = () => {
        this.setState({
            error: ''
        })
    }

    render() {
        // debugger
        let { error, success } = this.state;
        let errmsg = error && error !== '' &&
            <div className="alert mb-0 alert-danger alert-dismissible fade show"  role="alert">
                {error}
                <button type="button" onClick = {this.removeError} className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
        let successmsg = success && success !== '' &&
            <div className="alert mb-0 alert-success alert-dismissible fade show"  role="alert">
                {success}
                <button type="button" onClick = {this.removeSuccess} className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>

        return (
            <div className="App">
                <Nav />
                <div className='container'>
                  { errmsg }
                  {successmsg}
                </div>
                <div className='container mt-2'>
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route exact path='/auth/signup' render={props =><TeacherAuthForm 
                            submitText='Sign up Now' 
                            headText="Sign up" 
                            type='signup' 
                            addError={this.addError} removeError={this.removeError}
                            addSuccess={this.addSuccess} removeSuccess={this.removeSuccess}
                            />}  />
                        <Route exact path='/auth/signin' render={props =><TeacherAuthForm 
                            submitText='Login' 
                            headText="Welcome Back" 
                            type='signin' 
                            addError={this.addError} removeError={this.removeError}
                            addSuccess={this.addSuccess} removeSuccess={this.removeSuccess}
                        />} />
                        <Route exact path='/teachers/' render={ props => <TeacherDashboard addError={this.addError} removeError={this.removeError}/>} />
                        <Route exact path='/teachers/newquestionpaper' render={props=><NewQuestionPaper {...props} addError={this.addError} removeError={this.removeError} /> } />
                        <Route  path='/teachers/:questionPaperId' render={props =>
                             <QuestionPaper {...props} addError={this.addError} removeError={this.removeError}/>
                          }
                        />
                    </Switch>
                </div>
              </div>
        );
    }
}

export default App;
