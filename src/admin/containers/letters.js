//TODO learn ramda

import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post, send_sub_reminder_post } from '../redux/modules/letters.js'

import StandingOrderLetter from '../dumb_components/standing_order_letter.js'

const Letters = (props) => {
  console.log(props)
  return (
    <div>
      <button onClick={props.send_newsletter_post}>Get Members</button>
      <button onClick={props.send_sub_reminder_post}>Get Outstanding Members</button>
        {props.letters.length > 0
          ? <ul>
            {props.letters.map((member, i) => <li key={i}>{member.first_name}</li>)}
          </ul>
          : <p>Loading</p>
        }
        {props.letters.map((letter, i) =>
          <li key={i}>
            <StandingOrderLetter letter={letter}/>
          </li>)}
    </div>
  )
}


const mapStateToProps = (state) => {
  return { letters: state.letters }
}

export default connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post })(Letters)
