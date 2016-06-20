import React from 'react'

export default ({ letter }) => {

  const formatContent = (content) => (
    <div>
      {content.split('\n').map((paragraph, i) =>
        i === 0
          ? <div className='letter-greeting'> <p key={i}>{paragraph}</p></div>
          : <p key={i}>{paragraph}</p>
      )
    }
    </div>
  )


  return (
    <div className='letter'>
      <h3>Membership Number: {letter.id}</h3>
        {formatContent(letter.email_content)}
    </div>
  )
}
