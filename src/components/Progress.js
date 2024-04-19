import React from 'react'

const Progress = ({index, numberOfQuestions, points, totalPoints}) => {
  return (
    <header className='progress'>
      <progress max={numberOfQuestions} value={index} />
      <p>Question {index + 1} / {numberOfQuestions}</p>
      <p>{points} / {totalPoints}</p>
    </header>
  )
}

export default Progress