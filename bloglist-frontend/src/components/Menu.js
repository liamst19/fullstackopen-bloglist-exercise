import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

import LogoutButton from './LogOutButton'

const Menu = props => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="light">
      <Navbar.Toggle ariacontrols="responsive-navbar-nav" />
      <Navbar.Collapse id="responseive-navbar-nav">
        <Nav.Link href="#" as="span"><Link to='/'>blogs</Link></Nav.Link>
        {props.user ? <Nav.Link href="#" as="span"><Link to='/new'>create blog</Link></Nav.Link> : null}
        <Nav.Link href="#" as="span"><Link to='/users'>users</Link></Nav.Link>
        <Nav.Link href="#" as="span"><LogoutButton /></Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    user: state.login
  }
}

export default connect(mapStateToProps)(Menu)