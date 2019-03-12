import React from 'react';

const QuestionSet = (props)=>{
    return (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Subject</th>
              <th scope="col">Class</th>
              <th scope="col">Total Questions</th>
              <th scope="col">Total Marks</th>
            </tr>
          </thead>
          <tbody>
          {props.questions.map((question,i)=>{
             return <tr>
                <th scope='row'> {i+1}</th>
                <th><a href='/teachers/'>question.subject</a></th>
                <th>question.standard</th>
                <th>question.totalQuestions</th>
                <th>question.totalMarks</th>
              </tr>
          })}
          </tbody>
        </table>
        )
}

export default QuestionSet