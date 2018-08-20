import React from 'react';


const ScoreBoard = (props) => {
  const allPlayers =
   props.data.players.data.map(player => {
      return (
        <p>
          Player:{player.attributes.name}
        </p>
      )
    })

  const allScores = props.data.scores.data.map( score => {
    return(
      <p>
        Score: {score.attributes.time}
      </p>
    )
  })



  return (
    <div>
      <h1>ScoreBoard</h1>
        <div className="Score-board" >
          {allPlayers} {allScores}
        </div>
    </div>
  )
}

export default ScoreBoard
