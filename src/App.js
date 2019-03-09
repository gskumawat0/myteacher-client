import React, { Component } from 'react';
import './App.css';
import QuestionPaper from './QuestionPaper.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      errors: ['oops!! it is a error']
    };

  }

  //add a error
  addError = (err) => {
    this.setState({
      errors: [...this.state.errors, err]
    });

  }

  removeError = () => {
    this.setState({
      errors: []
    })
  }



  render() {
    // debugger
    let { errors } = this.state;
    let err = errors && errors.length > 0 && errors.map((error, i) => {
      return <div className="alert alert-danger alert-dismissible fade show" key={i} role="alert">
        {error}
        <button type="button" onClick = {this.removeError} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

    })
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <span className="navbar-brand mb-0 ml-md-5 h1">Dashboard</span>
        </nav>
        <div className='container'>
          { err  }
          <QuestionPaper />
        </div>
      </div>
    );
  }
}

export default App;
