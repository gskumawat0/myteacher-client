import React from 'react';
import { Link } from 'react-router-dom';

const QuestionPapersTable = (props) => {
    return (
        <table className="table table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Subject</th>
              {props.isStudent=== false && <th scope="col">Class</th>}
              <th scope="col">Last Date</th>
              <th scope="col">Total Questions</th>
              <th scope="col">Total Marks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {props.questionPapers.map((questionPaper,i)=>{
             return <tr key={questionPaper._id||i}>
                <th scope='row'> {i+1}</th>
                <th><Link to={`/${props.isStudent=== false?'teachers':'students'}/${questionPaper._id}`}>{questionPaper.subject}</Link></th>
                {props.isStudent === false &&<th> {questionPaper.standard} </th>}
                <th>{questionPaper.lastDate.split('T')[0].split('-').reverse().join('-')}</th>
                <th>{questionPaper.totalQuestions}</th>
                <th>{questionPaper.totalMarks}</th>
                {props.isStudent=== false  
                ?  <th className='text-danger' onClick={props.deleteQuestionPaper.bind(this,questionPaper._id )}>Delete</th>
                : <th className='text-warning'> <Link to={`/students/${questionPaper._id}`}>Start</Link></th>}
              </tr>
          })}
          </tbody>
        </table>
    )
}

export default QuestionPapersTable
