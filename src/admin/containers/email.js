'use strict'

const React = require('react')
const { connect } = require('react-redux')

const Field = require('../components/field.js')
const { fetch_member } = require('../redux/modules/member.js')

const Email = React.createClass({
  initialState: {},

  componentDidMount () {
    const { params: { id }, fetch_member } = this.props
    fetch_member(id)
  },
  render () {
    const { id, address, name } = this.props.email
    return (
      <div className='main-container email-page'>
        <div className='header'>
          <h1>Friends of Chichester Harbour</h1>
          <h3>Registered Charity No: 1051162</h3>
          <img src='/' className='letter-logo'></img>
        </div>
        <div className='addresses'>
          <div className='receiver-address'>
            { address.filter(x => !!x)
              .map((line, i) => <div key={i}>{line}<br /></div>) }
          </div>
          <div className='sender-address'>
            Correspondence to: <br />
            Membership Secretary, <br />
            Friends of Chichester Harbour, <br />
            42 Bracklesham Road, <br />
            Hayling Island, Hampshire <br />
            PO11 9SJ <br />
            e-mail: membershipsecretary@friendsch.org
          </div>
        </div>
        <div className='letter'>
          <h3>Membership Number: { id }</h3>
          <p>Dear { name },</p>

          <p>Thank you for joining the Friends of Chichester Harbour. The latest Newsletter can be found on the Friends website (www.friendsch.org). It includes details of the Officers of the Friends – please feel free to contact any of them if you have any questions.</p>

          <p>The Newsletter includes details of social events which you may wish to attend.  We also sometimes ask for help of various kinds – if you would like to become involved or have any special skill or professional experience that might be helpful to the Friends please let us know.</p>

          <p>In cooperation with the Harbour Conservancy, who are based at the Harbour office in Itchenor, we run weekly  volunteer work parties. If you are interested in joining them please contact the Harbour Ofice on 01243-512301 or nicky@conservancy.co.uk</p>

          <p>Regardless of whether you take part in any of the Friends activities, I assure you that you are still helping simply by contributing. The Friends finance a number of projects , which you will hear about through the Newsletter or the website.  And our membership of various committees gives members a voice in the governance of the Harbour.</p>

          <p>As is common practice, we keep our membership records on a database. We do not make this information available to any other organization.</p>

          <p>I do hope you get pleasure from your membership of the Friends and I look forward to meeting you at some future occasion.</p>

          <p>Yours sincerely</p>

          Mark Stanton <br />
          Chairman, <br />
          Friends of Chichester Harbour <br />
        </div>
      </div>
    )
  }
})

Email.displayName = 'EmailPage'

module.exports = connect(({ email }) => ({ email }), { fetch_member })(Email)
