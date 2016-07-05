const React = require('react')
const { map, objOf, zipWith, merge, compose } = require('ramda')

export default ({ members, submit }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const template = format_message(e.target[0].value)
    const emailBodies = map(compose(objOf('email_body'), template), members)
    const emails = zipWith(merge, members, emailBodies)
    submit(emails)
  }
  return (
    <div>
      <p><i>Write out the email body here.</i></p>
      <form onSubmit={onSubmit}>
        <textarea />
        <button
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const format_message = body => member => (
  `Dear ${member.first_name || member.title + ' ' + member.last_name},
  ${body}`
)
