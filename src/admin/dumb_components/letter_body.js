import React from 'react'

export default ({ letter }) => {

  const formatContent = (content) => {
    return (
      <div>
        {content.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
    )
  }

  return (
    <div className='letter'>
      <h3>Membership Number: {letter.id}</h3>
        {formatContent(letter.email_content)}
      <p>Sincerely</p>

      Richard Evans, <br />
      Treasurer, <br />
      Friends of Chichester Harbour <br />
    </div>
  )
}
