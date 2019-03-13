import React from 'react';

const QuestionPaperInfoForm = (props) => {
    let { totalQuestions, totalMarks } = props;
    return (
        <form onSubmit={props.handleQuestionPaperSubmit} method='post'>
              <div className="form-group">
                <label htmlFor="standard">Standard:</label>
                <select onChange={props.handleChange} name='standard' id='standard' className='form-control' required>
                    <option value='' >choose a class</option>
                    <option value='VI' >VI</option>
                    <option value='VII'>VII</option>
                    <option value='VIII'>VIII</option>
                    <option value='IX'>IX</option>
                    <option value='X'>X</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subject" >Subject:</label>
                <select onChange={props.handleChange} id='subject' name='subject' className='form-control' required>
                    <option value=''>choose a subject</option>
                    <option value='english'>english</option>
                    <option value='science'>science</option>
                    <option value='geography'>geography</option>
                    <option value='history'>history</option>
                    <option value='sports'>sports</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="marks">Total marks:</label>
                <input type="number" onChange={props.handleChange} value={totalMarks} name='totalMarks' className="form-control" id="marks" placeholder="total marks" required/>
              </div>
              <div className="form-group">
                <label htmlFor="marks">Total questions:</label>
                <input type="number" onChange={props.handleChange} value={totalQuestions} name='totalQuestions' className="form-control" id="marks" placeholder="total questions" required/>
              </div>
              <button type="submit" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Submit after adding all questions">Submit Question Paper</button>
            </form>
    )
}

const QuestionsForm = (props) => {
    let { totalQuestions, questions } = props;
    let { question, option1, option2, option3, option4, option5, option6 } = props;
    let { answer1, answer2, answer3, answer4 } = props;

    return <form onSubmit={props.handleQuestionSubmit} method='post'>
              <p className='float-right'>Questions remaining: {totalQuestions - questions.length} </p>    
              <p className='mb-0 ml-md-2'>Select answer type:</p>
                <div className="form-check ml-md-4">
                  <input className="form-check-input" type="radio" name="answerType" id="single" onChange={props.handleChange} value="single" required/>
                  <label className="form-check-label mr-3" htmlFor="single">
                    single answer type
                  </label>
                  <input className="form-check-input ml-4" type="radio" name="answerType" onChange={props.handleChange} id="multiple" value="multiple" required/>
                  <label className="form-check-label mx-5" htmlFor="multiple">
                    multiple answer type
                  </label>
                </div>
                <div className="form-group mt-1">
                  <label className="" htmlFor="question">
                    Question:
                  </label>
                  <input type='text' name='question' id='question' value={question} onChange={props.handleChange} placeholder='question' className='form-control' required/>
                </div>
                <div className='form-group' id='options'>
                  <p className='mb-0 ml-md-2'>Options:</p>
                    <input type='text' name='option1' value={option1} onChange={props.handleChange} placeholder='option 1' className='form-control  my-1' required/> 
                    <input type='text' name='option2' value={option2} onChange={props.handleChange} placeholder='option 2' className='form-control  my-1' required/> 
                    <input type='text' name='option3' value={option3} onChange={props.handleChange} placeholder='option 3' className='form-control  my-1' required/> 
                    <input type='text' name='option4' value={option4} onChange={props.handleChange} placeholder='option 4' className='form-control  my-1' required/> 
                    <input type='text' name='option5' value={option5} onChange={props.handleChange} placeholder='option 5(optional)' className='form-control  my-1'/> 
                    <input type='text' name='option6' value={option6} onChange={props.handleChange} placeholder='option 6(optional)' className='form-control  my-1'/> 
                    <small>Max.6 option allowed</small>
                </div>
                <div className='form-group' id='answers'>
                    <p className='mb-0 ml-md-2'>Answers:</p>
                    <input type='text' name='answer1' value={answer1} onChange={props.handleChange} placeholder='answer 1(required)' className='form-control my-1' required/>
                    <input type='text' name='answer2' value={answer2} onChange={props.handleChange} placeholder='answer 2(optional)' className='form-control my-1' />
                    <input type='text' name='answer3' value={answer3} onChange={props.handleChange} placeholder='answer 3(optional)' className='form-control my-1' />
                    <input type='text' name='answer4' value={answer4} onChange={props.handleChange} placeholder='answer 4(optional)' className='form-control my-1' />
                </div>
              <button type="submit" className="btn btn-primary mb-3" >Submit Question</button>
            </form>
}

export { QuestionsForm, QuestionPaperInfoForm };
