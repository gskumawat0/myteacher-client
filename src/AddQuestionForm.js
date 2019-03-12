import React, { Component } from 'react';
import './AddQuestionForm.css';
// import ReactDOM from 'react-dom';

class AddQuestionForm extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
            Add a Question
        </button>
        <div className="collapse m-2" id="collapseForm">
          <form method='post' onSubmit={this.handleQuestionSubmit}>
            <p className='mb-0 ml-md-2'>Select answer type:</p>
            <div className="form-check ml-md-4">
              <input className="form-check-input" type="radio" name="answerType" id="single" onChange={this.handleChange} value="single" defaultChecked/>
              <label className="form-check-label mr-3" htmlFor="single">
                single answer type
              </label>
              <input className="form-check-input ml-4" type="radio" name="answerType" onChange={this.handleChange} id="multiple" value="multiple" />
              <label className="form-check-label mx-5" htmlFor="multiple">
                multiple answer type
              </label>
            </div>
            <div className="form-group">
              <label className="" htmlFor="question">
                Question:
              </label>
              <input type='text' name='question' id='question' onChange={this.handleChange} className='form-control'/>
            </div>
            <div className='form-group' id='options'>
              <p className='mb-0 ml-md-2'>Options:</p>
              <input type='text' name='option1'  /*onChange={this.handleChange} */onKeyPress={this.handleKeyPress} className='form-control'/>
              <input type='text' name='option2'  onChange={this.handleChange} className='form-control'/>
              <input type='text' name='option3'  onChange={this.handleChange} className='form-control'/>
              <input type='text' name='option4'  onChange={this.handleChange} className='form-control'/>
              <input type='text' name='option5'  onChange={this.handleChange} className='form-control'/>
              <input type='text' name='option6'  onChange={this.handleChange} className='form-control'/>
            </div>
            <button className='btn btn-warning'> Submit question to Physics question set</button>
          </form>
        </div>
    </div>
    )
  }
}


export default AddQuestionForm;
