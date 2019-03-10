import React, { Component } from 'react';
import './QuestionForm.css';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerType: `single`
    }
  }
  render() {
    return (
      <div>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
                    Add a Question
                </button>
                <div className="collapse m-2" id="collapseForm">
                  <form method='post'>
                    <p className='mb-0 ml-md-2'>Select answer type:</p>
                    <div className="form-check ml-md-4">
                      <input className="form-check-input" type="radio" name="answerType" id="single" value="single" defaultChecked/>
                      <label className="form-check-label mr-3" htmlFor="single">
                        single answer type
                      </label>
                      <input className="form-check-input ml-4" type="radio" name="answerType" id="multiple" value="multiple" />
                      <label className="form-check-label mx-5" htmlFor="multiple">
                        multiple answer type
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="" htmlFor="question">
                        Question:
                      </label>
                      <input type='text' name='question' id='question' className='form-control'/>
                    </div>
                  </form>
                </div>
            </div>
    )
  }
}


export default QuestionForm;
