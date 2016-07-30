import React from 'react'

import NavBar from './containers/nav_bar.js'

export default class UserApp extends React.Component {
  render () {
    const clone_child = child => React.cloneElement(child, { name: this.props.name })
    return (
      <div>
        <NavBar />
        {React.Children.map(this.props.children, clone_child)}
      </div>
  )}
}
