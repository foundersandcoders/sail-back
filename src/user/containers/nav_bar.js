import React from 'react'
import { connect } from 'react-redux'
import { fetch_user_details } from '../redux/modules/my_details.js'

import { map, zip } from 'ramda'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

const NavBar = () =>
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


const routes = [ '#', '#statements', '#make-payment', '/signout' ]
const text = [ 'My Details', 'My Statements', 'make a Payment', 'Sign Out' ]

export default connect(null, { fetch_user_details })(NavBar)
