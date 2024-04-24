import React from 'react'

const FinishScreen = ({points, totalPoints, highestScore, dispatch}) => {
    const percentage = (points / totalPoints) * 100

    let emoji;
    if (percentage === 100) emoji = "🥇"
    if (percentage >= 80 && percentage < 100) emoji = "🎉"
    if (percentage >= 50 && percentage < 80) emoji = "🙃"
    if (percentage >= 0 && percentage < 50) emoji = "🤔"
    if (percentage === 0) emoji = "🤦‍♂️"

  return (
    <>
        <p className='result'>
            <span>{emoji} You scored <strong>{points}</strong> out of <strong>{totalPoints}</strong> ({Math.ceil(percentage)}%)</span>
        </p>
        <p className='highscore'>(Highscore: {highestScore} points)</p>
        <button className='btn btn-ui' onClick={() => dispatch({type: "restart"})}>Restart</button>
    </>
  )
}

export default FinishScreen