// Libraries ---------------------------------------
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
// Reducers ----------------------------------------
import { getAllBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'
// Components --------------------------------------
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogOutButton'
import Blogs from './components/Blogs'
import NewBlogForm from './components/NewBlogForm'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import UserDetails from './components/UserDetails'
// -------------------------------------------------

const App = ({ user, getAllUsers, getAllBlogs, initializeUser }) => {

  useEffect(() => {
    getAllUsers()
  },[getAllUsers])

  useEffect(() => {
    getAllBlogs()
  },[getAllBlogs])

  useEffect(() => {
    initializeUser()
  },[initializeUser])

  return (
    <div className='container'>
      <Router><div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="light">
          <Navbar.Toggle ariacontrols="responsive-navbar-nav" />
          <Navbar.Collapse id="responseive-navbar-nav">
            <Nav.Link href="#" as="span"><Link to='/'>blogs</Link></Nav.Link>
            {user ? <Nav.Link href="#" as="span"><Link to='/new'>create blog</Link></Nav.Link> : null}
            <Nav.Link href="#" as="span"><Link to='/users'>users</Link></Nav.Link>
            <Nav.Link href="#" as="span"><LogoutButton /></Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        <div>
          <Route exact path="/" render={() => <Blogs />} />
          <Route path="/blogs/:id" render={({ match }) => <BlogDetails id={match.params.id}/>} />
          <Route path="/new" render={() => <NewBlogForm />}/>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/users" render={() => <UsersList />} />
          <Route path="/user/:id" render={({ match }) => <UserDetails id={match.params.id}/>} />
        </div>
      </div></Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.login,
    // users: state.users,
    // blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { initializeUser, getAllBlogs, getAllUsers }
)(App)