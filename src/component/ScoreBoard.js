import React from 'react';



const ScoreBoard = (props) => {

  console.log(props);

  return (
    <div>
      <h1>ScoreBoard</h1>
        <div className="Score-board" >
          <table className="table">
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
            <tr>
              <td>{props.player}</td>
              <td>{props.score}</td>
            </tr>
          </table>


        </div>
    </div>
  )
}

export default ScoreBoard


//   const allPlayers =
//    props.data.players.data.map(player => {
//       return (
//         <p>
//           Player:{player.attributes.name}
//         </p>
//       )
//     })
//
//   const allScores = props.data.scores.data.map( score => {
//     return(
//       <p>
//         Score: {score.attributes.time}
//       </p>
//     )
//   })
