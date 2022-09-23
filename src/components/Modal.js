import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className='modal'>
        {console.log("modal is now shown")}
        {isCorrect && <div><h1>You win!</h1><p className='solution'>{solution}</p><p>You found the solution in {turn} guess{turn !== 1 && 'es'}</p></div>}
        {!isCorrect && <div><h1>You lose!</h1><p className='solution'>{solution}</p><p>Better luck next time</p></div>}
    </div>
  )
}
