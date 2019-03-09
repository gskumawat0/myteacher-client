import React, { Component } from 'react';
import './App.css';
import QuestionPaper from './QuestionPaper.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: ['what is your name?', 'what is your Father name?'],
      error: 'this is a error'
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

  handleNavClick = () => {
    this.addError(`an error happened ${Math.floor(Math.random() * 20 + 1)}`);
  }


  render() {
    // debugger
    let { error, questions } = this.state;
    let err = error && error !== '' &&
      <div className="alert alert-danger alert-dismissible fade show"  role="alert">
        {error}
        <button type="button" onClick = {this.removeError} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning" onClick={this.handleNavClick}>
          <span className="navbar-brand mb-0 ml-md-5 h1">Dashboard</span>
        </nav>
        <div className='container'>
          { err  }
          <QuestionPaper  questions ={questions} />
        </div>
      </div>
    );
  }
}

export default App;
