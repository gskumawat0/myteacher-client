import React from 'react';

const ScoreCardTable = (props) => {
    return (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Email</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
          {props.studentScores.map((studentScore,i)=>{
             return <tr key={studentScore._id||i}>
                <th scope='row'> {i+1}</th>
                <th>{studentScore.submittedBy.email}</th>
                <th>{studentScore.submittedBy.score}</th>
              </tr>
          })}
          </tbody>
        </table>
    )
}

export default ScoreCardTable;
