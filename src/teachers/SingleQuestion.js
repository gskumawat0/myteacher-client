import React from 'react';


const SingleQuestion = (props) => {
    let inputType = props.question.answerType === "single" ? `radio` : `checkbox`;
    return (
        <div>
            <p className='mb-0'>{props.question.question}?</p>
            <p className='mb-0'>select answer from given below options :-</p>
            <ul className='list-unstyled'>
                {props.question.options.map((option,i) =>{
                    return <li key={`${props.questionId}_${i}`}> <input type={inputType}  name={`answers[${props.question._id}]`} onChange={props.handleChange} value={option} className='mx-2' />
                        <label>{option} </label>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default SingleQuestion;
