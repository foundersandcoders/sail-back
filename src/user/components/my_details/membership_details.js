import React from 'react'

import EditDetails from './edit_details.js'


export default (props) =>
  <div>
    <div className='end-membership'>
      <button>End Membership</button>
    </div>
    <EditDetails {...props} />
  </div>
