import React from 'react';

const QuestionSetInfo = (props) => {
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
          {props.questionSets.map((questionSet,i)=>{
             return <tr>
                <th scope='row'> {i+1}</th>
                <th><a href='/teachers/{questionSet._id}'>questionSet.subject</a></th>
                <th>questionSet.standard</th>
                <th>questionSet.totalQuestions</th>
                <th>questionSet.totalMarks</th>
              </tr>
          })}
          </tbody>
        </table>
    )
}

export default QuestionSetInfo
