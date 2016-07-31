import React from 'react'

import NavBar from './containers/nav_bar.js'

export default (props) => (
  <div>
    <NavBar />
    {props.children}
  </div>
)
