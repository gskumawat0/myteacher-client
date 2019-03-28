import React from 'react';

const QuestionPaperInfoForm = (props) => {
    let { totalQuestions, totalMarks, lastDate, assignedTo } = props;
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
                    <option value='english'>English</option>
                    <option value='science'>Science</option>
                    <option value='geography'>Geography</option>
                    <option value='history'>History</option>
                    <option value='sports'>Sports</option>
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
              <div className="form-group">
                <label htmlFor="lastDate">Last date of submission:</label>
                <input type="date" onChange={props.handleChange} value={lastDate} name='lastDate' className="form-control" id="lastDate" placeholder="last date of submission" required/>
              </div>
              <div className="form-group">
                <label htmlFor="assignedTo">Assigned to:</label>
                <input type="text" onChange={props.handleChange} value={assignedTo} name='assignedTo' className="form-control" id="assignedTo" placeholder="enter email of students with comma seperated. leave empty if assigned to whole class." />
              </div>
              <button type="submit" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Submit after adding all questions">Submit Question Paper</button>
            </form>
    )
}

const QuestionsForm = (props) => {
    let { totalQuestions, questions, question, answers, options, answerType, handleChange, handleOptionChange, handleOptionAppend, handleOptionRemove, handleAnswerChange, handleQuestionSubmit } = props;
    let optionList = options.map((option, i) => {
        return <div key={i} className='form-row'>
                    <input type='checkbox' value={option} name='answers' onChange={handleAnswerChange} className='col-1 m-auto' checked={answers.includes(option) && option !== ''}/>
                    <input type='text' name={option[i]} value={option} onChange={handleOptionChange.bind(this, i)} placeholder={`option ${i + 1}`} className=' col-10 form-control  my-1' required/> 
                    <p className='col-1 my-auto' >
                        <span className=' px-2 my-auto' onClick={handleOptionRemove.bind(this, i)}>-</span>
                        {options.length - 1 === i ? <span className='px-2 my-auto' onClick={handleOptionAppend}>+</span> : <span className='col-1 px-2 my-auto'></span> }
                    </p>
                </div>
    })
    return <form onSubmit={handleQuestionSubmit} method='post'>
              <p className='float-right'>Questions remaining: {totalQuestions - questions.length > 0 ? totalQuestions - questions.length : 0} </p>    
              <p className='mb-0 ml-md-2'>Select answer type:</p>
                <div className="form-check ml-md-4">
                  <input className="form-check-input" type="radio" name="answerType" id="single" onChange={handleChange} value="single" checked={answerType === 'single'} required/>
                  <label className="form-check-label mr-3" htmlFor="single">
                    single answer type
                  </label>
                  <input className="form-check-input ml-4" type="radio" name="answerType" onChange={handleChange} id="multiple" value="multiple" checked={answerType === 'multiple'} required/>
                  <label className="form-check-label mx-5" htmlFor="multiple">
                    multiple answer type
                  </label>
                </div>
                <div className="form-group mt-1">
                  <label className="" htmlFor="question">
                    Question:
                  </label>
                  <input type='text' name='question' id='question' value={question} onChange={handleChange} placeholder='question' className='form-control' required/>
                </div>
                <div className='form-group' id='options'>
                  <p className='mb-0 ml-md-2'>Options:</p>
                  {optionList}
                  <small className=' ml-md-2'> click on checkbox next to input to select input as answer</small>
                </div>
              <button type="submit" className="btn btn-primary mb-3" >Submit Question</button>
            </form>
}

export { QuestionsForm, QuestionPaperInfoForm };
