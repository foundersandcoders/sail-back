const React = require('react')
const { map, objOf, zipWith, merge, compose, indexBy, prop, converge, dissoc } = require('ramda')

export default ({ members, submit }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const template = format_message(e.target)
    const emailBodies = map(compose(objOf('content'), template), members)
    const emailsArr = zipWith(merge, members, emailBodies)
    const setEmailKey = map(compose(indexBy, prop), ['primary_email', 'secondary_email'])
    const shapedEmails = compose(dissoc('null'), converge(merge, setEmailKey))(emailsArr)
    submit(shapedEmails)
  }
  return (
    <div className='custom-email-container'>
      <p><i>Write out your custom email.</i></p>
      <form onSubmit={onSubmit}>
        <input type='text' className='custom-email-subject' placeholder='Subject'></input>
        <textarea className='custom-email' placeholder='Email body' />
        <button
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const format_message = form => member => (
  [ `${form[0].value}`
  , `Dear ${member.first_name || member.title} ${member.last_name},`
  , `${form[1].value}`
  ]
)
