import React from 'react'

export default ({ letter }) => {
  const formatContent = (content) => (
    <div>
      {content.split('\n').map((paragraph, i) =>
        i === 0
          ? <div key={i} className='letter-greeting'> <p>{paragraph}</p></div>
          : <p className='letter-content' key={i}>{paragraph}</p>
       )
      }
    </div>
  )
  return (
    <div className='letter'>
      <h3>Membership Number: {letter.id}</h3>
        {formatContent(letter.letter_content)}
    </div>
  )
}
