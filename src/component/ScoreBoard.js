import React from 'react';



const ScoreBoard = (props) => {



  return (
    <div className='concrete'>
      <div className='white-div'>

        <h1>GAME OVER</h1>
        <h2>You won {props.score} times! </h2>
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
