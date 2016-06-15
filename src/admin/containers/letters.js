//TODO learn ramda

import React from 'react'
import { connect } from 'react-redux'

import { get_post_members } from '../redux/modules/letters.js'

const Letters = (props) => {
  return (
    <div>
      <button onClick={props.get_post_members}>Get Members</button>
    </div>
  )
}



export default connect(null, { get_post_members })(Letters)
