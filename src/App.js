import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import QuestionPaper from './QuestionPaper.js';
import TeacherDashboard from './TeacherDashboard'
import QuestionSetForm from './QuestionSetForm'
import Homepage from './Homepage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: ['what is your name?', 'what is your Father name?'],
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
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <span className="navbar-brand mb-0 ml-md-5 h1">MyTeacher</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                {/*<p className=' mr-md-5 mb-0' >{navItem} </p> */}
              </li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          { err  }
        </div>
        <div className='container mt-2'>
            <Switch>
            <Route exact path='/' component={Homepage} />
              <Route exact path='/teachers/' render={ props => <TeacherDashboard addError={this.addError}/>} />
              <Route exact path='/teachers/newquestionset' render={props=><QuestionSetForm {...props} addError={this.addError} /> } />
              <Route  path='/teachers/:questionSetId' render={props => {
                return (
                <QuestionPaper {...props} addError={this.addError} />)}} 
            />
            </Switch>
        </div>
      </div>
        );
    }
}

export default App;
