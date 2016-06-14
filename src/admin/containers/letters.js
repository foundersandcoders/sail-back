//TODO learn ramda

import React from 'react'
import { connect } from 'react-redux'


class Letters extends React.Component {
  render () {
    return (
      <div>
        <button>Get Members</button>
        in letters containeer
      </div>
    )
  }
}



export default connect()(Letters)
