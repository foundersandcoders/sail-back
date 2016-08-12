import React from 'react'
import { map, zip } from 'ramda'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default () =>
  <Navbar>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        {map(item)(zip(routes, text))}
      </Nav>
    </Navbar.Collapse>
  </Navbar>


const item = ([route, text]) =>
  <NavItem key={route} href={route}>{text}</NavItem>


const routes = [ '#', '#statements', '#make-payment', '#change-password', '/signout' ]
const text = [ 'My Details', 'My Statements', 'Make a Payment', 'Change Password', 'Sign Out' ]
