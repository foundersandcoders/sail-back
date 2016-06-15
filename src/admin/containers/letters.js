//TODO learn ramda

import React from 'react'
import { connect } from 'react-redux'

import { get_post_members, send_sub_reminder_post } from '../redux/modules/letters.js'

const Letters = (props) => {
  return (
    <div>
      <button onClick={props.get_post_members}>Get Members</button>
      <button onClick={props.send_sub_reminder_post}>Get Outstanding Members</button>
      {props.letters.length > 0
        ? <ul>
          {props.letters.map((member, i) => <li key={i}>{member.first_name}</li>)}
        </ul>
        : <p>ivans div</p>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return { letters: state.letters }
}

export default connect(mapStateToProps, { get_post_members, send_sub_reminder_post })(Letters)
