import React from 'react';

const RadioInput = (props) => {
    return <ul className='list-unstyled'>
    {props.options.map((option,i) =>{
        return <li key='i'> <input type='radio' name='{props.questionId}' className='mx-2' value='{option}' />
            <label>{option} </label>
        </li>
    })}
    </ul>
}
const CheckBoxInput = (props) => {
    return <ul className='list-unstyled'>
    {props.options.map((option,i) =>{
        return <li key={i}> <input type='checkbox' name='{props.questionId}' value='{option}' className='mx-2' />
            <label>{option} </label>
        </li>
    })}
    </ul>
}

const SingleQuestion = (props) => {
    debugger
    return <div>
        <p className='mb-0'>{props.question.question}?</p>
        <p className='mb-0'>select answer from given below options :-</p>
        {props.question.answerType === "single" 
        ? <RadioInput options={props.question.options} questionId={props.question._id}/> 
        : <CheckBoxInput options={props.question.options} questionId={props.question._id}/>}
    </div>
}
export default SingleQuestion;
