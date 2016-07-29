import React from 'react'

import NavBar from './containers/nav_bar.js'
import App from '../shared/app.js'

export default class UserApp extends React.Component {
  render () {
    const add_details = this.add_details || id
    return (
      <div>
        {NavBar()}
        {React.Children.map(this.props.children, add_details)}
      </div>
  )}
}

function id (arg) { return arg }
