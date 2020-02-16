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
import Menu from './components/Menu'
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

  // Check browser for user info
  useEffect(() => {
    initializeUser()
  },[initializeUser])

  return (
    <div className='container'>
      <Router>
        <Menu /> 
        <Notification />
        <main>
          <Route exact path="/" render={() => <Blogs />} />
          <Route path="/blogs/:id" render={({ match }) => <BlogDetails id={match.params.id}/>} />
          <Route path="/new" render={() => <NewBlogForm />}/>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/users" render={() => <UsersList />} />
          <Route path="/user/:id" render={({ match }) => <UserDetails id={match.params.id}/>} />
        </main>
      </Router>
    </div>
  )
}

export default connect(
  null,
  { initializeUser, getAllBlogs, getAllUsers }
)(App)