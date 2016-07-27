import React from 'react'

import App from '../shared/app.js'

export default class UserApp extends React.Component{
  render () {
    return (
      <App
        user='User'
        add_details={this.add_details}
        children={this.props.children}
      />
  )}
}
