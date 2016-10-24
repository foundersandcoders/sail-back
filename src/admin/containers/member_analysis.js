import React from 'react'
import { connect } from 'react-redux'

// const props = {}

import { list_gift_aid } from '../redux/modules/member_analysis.js'

// export default () =>
const MemberAnalysis = (props) =>
  <div>
    <button onClick={props.list_gift_aid}>Click me!</button>
  </div>

export default connect(null, { list_gift_aid })(MemberAnalysis)
