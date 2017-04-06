import React from 'react'
import { connect } from 'react-redux'
import { identity, merge, propOr } from 'ramda'

import { toggle_gift_aid, toggle_delivery_method } from '../../shared/redux/modules/member.js'

class WelcomeScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  next_page () {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }))
  }
  render () {
    const props = merge({ next_page: this.next_page.bind(this) }, this.props)
    return (
      <div className='welcome-screen-container'>
        {components[this.state.page](props)}
      </div>
    )
  }
}

const Welcome = ({ next_page }) => {
  return (
    <div>
      <h4>
        You are now a member of the Friends of Chichester Harbour. There are just
        a few remaining questions to make sure your membership is set up correctly.
        Thank you for your patience.
      </h4>
      <button onClick={next_page}>Next</button>
    </div>
  )
}

const GiftAid = ({ toggle_gift_aid, next_page }) => {
  const handleSubmit = e => {
    e.preventDefault()
    toggle_gift_aid(true)
    next_page()
  }
  return (
    <div>
      <h4>
        You can boost the value of your subscription/donation to the Friends by 25p of
        Gift Aid for every £1 subscribed/donated. Gift Aid is reclaimed by the Friends
        from the tax you pay for the current tax year. If you wish to Gift Aid your
        subscription/donations to the Friends for this year and future years please
        tick the box below.
      </h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='checkbox' required/>
          <h4>
            I wish to make a Gift Aid Declaration to the Friends. I am a UK taxpayer and
            understand that if I pay less Income Tax and/or Capital Gains Tax than the
            amount of Gift Aid claimed on all my donations in that tax year it is my
            responsibility to pay any difference.
          </h4>
        </div>
        <button type='submit'>Proceed</button>
        <button type='button' onClick={next_page}>Proceed w/o Gift Aid</button>
      </form>
    </div>
  )
}

const DeliveryMethod = ({ toggle_delivery_method, next_page }) => {
  return (
    <div>
      <h3>How would you like access to our newsletters?</h3>
      <h4>
        Our newsletters can be posted (or hand delivered) to you three times a year –
        they are also available for you to read online on the Friends website. If you opted
        to read it online it would help us reduce postage and printing costs. If you would
        like to take that option please select 'Online' instead of 'Post'.
      </h4>
      <button onClick={() => { toggle_delivery_method('online'); next_page() }}>Online</button>
      <button onClick={() => { toggle_delivery_method('post'); next_page() }}>Post</button>
    </div>
  )
}

const SuccessfulSignUp = ({ personal_details }) => {
  return (
    <div>
      <h4>The sign up process is now complete. Welcome to the Friends!</h4>
      <h4>
        Your membership number is {propOr('', 'value', personal_details.id)}
        {propOr('', 'value', personal_details.membership_type).match(/annual/)
          ? ` and your subscription becomes due on the ${personal_details.due_date.value} of each year.`
          : '.'
        }
      </h4>
      <h4>
        If you wish to pay the initial subscription charge you can click the 'Make a Payment'
        tab at the top. We’d encourage you to pay by Credit Card or PayPal because it makes
        life easier both for you and for the volunteers who run the Friends .
      </h4>
    </div>
  )
}

const components = [ Welcome, GiftAid, DeliveryMethod, SuccessfulSignUp ]

export default connect(identity, { toggle_gift_aid, toggle_delivery_method })(WelcomeScreen)
