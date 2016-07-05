const React = require('react')
const { map, objOf, zipWith, merge, compose } = require('ramda')

export default class CustomEmail extends React.Component {
  onSubmit (e) {
    e.preventDefault()
    const { members } = this.props
    const template = format_message(this.refs.emailBody.value)
    const emailBodies = map(compose(objOf('email_body'), template), members)
    const emails = zipWith(merge, members, emailBodies)
    this.props.submit(emails)
  }
  render () {
    return (
      <div>
        <p><i>Write out the email body here.</i></p>
        <form>
          <textarea ref='emailBody' />
          <button
            onClick={(e) => this.onSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const format_message = body => member => (
  `Dear ${member.first_name || member.title + ' ' + member.last_name},
  ${body}`
)
