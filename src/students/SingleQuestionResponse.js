import React from 'react';

const SingleQuestionResponse = (props) => {
    let {question, currentQuestion, handleChange, selectedOptions, handleSingleResponse} = props;
    let inputType = question.answerType === "single" ? `radio` : `checkbox`;
    return (
        <div>
            <p className='mb-0'>{currentQuestion}. {question.question}?</p>
            <p className='mb-0'>select answer from given below options :-</p>
            <ul className='list-unstyled'>
                {question.options.map((option,i) =>{
                    return <li key={`${question._id}_${i}`}> <input type={inputType}  name={question._id} onChange={handleChange.bind(this, question.answerType)} value={option} checked={selectedOptions.includes(option)} className='mx-2' />
                        <label>{option} </label>
                    </li>
                })}
            </ul>
            <button className='btn btn-primary mx-1' onClick={handleSingleResponse.bind(this, question._id)}>submit and go to next question</button>
        </div>
    )
}
export default SingleQuestionResponse;
