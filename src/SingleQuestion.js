import React from 'react';

const RadioInput = (props) => {
    return <ul className='list-unstyled'>
    {props.options.map(option =>{
        return <li> <input type='radio' name='{props.questionId}' value='{option}' /></li>
    })}
    </ul>
}
const CheckBoxInput = (props) => {
    return <ul className='list-unstyled'>
    {props.options.map(option =>{
        return <li> <input type='checkbox' name='{props.questionId}' value='{option}' /></li>
    })}
    </ul>
}

const SingleQuestion = (props) => {
    return <div>
        <p>{props.question.question}?</p>
        <p>select answer from given below options :-</p>
        {props.question.questionType === "single" 
        ? <RadioInput options={props.question.options} questionId={props.question._id}/> 
        : <CheckBoxInput options={props.question.options} questionId={props.question._id}/>}
    </div>
}
export default SingleQuestion;
