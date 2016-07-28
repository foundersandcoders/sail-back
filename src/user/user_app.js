import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import App from '../shared/app.js'

export default class UserApp extends React.Component {
  render () {
    return (
      <div>
        {NavbarInstance()}
        <App
          user='User'
          add_details={this.add_details}
          children={this.props.children}
        />
      </div>
  )}
}

const NavbarInstance = () => (
  <Navbar>
    <Navbar.Header>
      <div className='navigationbar'>
        <Navbar.Toggle />
      </div>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={2} href="#">My Details</NavItem>
        <NavItem eventKey={3} href="#">My Payments</NavItem>
        <NavItem eventKey={4} href="#">Make a Payment</NavItem>
        <NavItem eventKey={1} href="/signout">Sign Out</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
