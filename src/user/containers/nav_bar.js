import React from 'react'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default () =>
  <Navbar>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={2} href="#">My Details</NavItem>
        <NavItem eventKey={3} href="#statements">My Statements</NavItem>
        <NavItem eventKey={4} href="#make-payment">Make a Payment</NavItem>
        <NavItem eventKey={1} href="/signout">Sign Out</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
