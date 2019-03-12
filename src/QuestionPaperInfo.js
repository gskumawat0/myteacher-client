import React from 'react';
import { Link } from 'react-router-dom';

const QuestionPaperInfo = (props) => {
    return (
        <table className="table table-hover text-center">
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
          {props.questionPapers.map((questionPaper,i)=>{
             return <tr key={i}>
                <th scope='row'> {i+1}</th>
                <th><Link to={`/teachers/${questionPaper._id}`}>{questionPaper.subject}</Link></th>
                <th>{questionPaper.standard}</th>
                <th>{questionPaper.totalQuestions}</th>
                <th>{questionPaper.totalMarks}</th>
              </tr>
          })}
          </tbody>
        </table>
    )
}

export default QuestionPaperInfo
