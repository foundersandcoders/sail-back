import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

import App from '../shared/app.js'

export default class UserApp extends React.Component {

  render () {
    const add_details = this.add_details || id
    return (
      <div>
        {NavbarInstance()}
        {React.Children.map(this.props.children, add_details)}
      </div>
  )}
}

function id (arg) { return arg }

const NavbarInstance = () => (
  <Navbar>
    <Navbar.Toggle />
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
