import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import QuestionPaper from './QuestionPaper.js';
import TeacherDashboard from './TeacherDashboard'
import NewQuestionPaper from './NewQuestionPaper'
import Homepage from './Homepage';

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
        };

    }

    //add a error
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

    render() {
        // debugger
        let { error } = this.state;
        let err = error && error !== '' &&
            <div className="alert mb-0 alert-danger alert-dismissible fade show"  role="alert">
        {error}
        <button type="button" onClick = {this.removeError} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

        return (
            <div className="App">
                <Nav />
                <div className='container'>
                  { err  }
                </div>
                <div className='container mt-2'>
                    <Switch>
                        <Route exact path='/' component={Homepage} />
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
