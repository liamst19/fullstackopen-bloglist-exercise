// Libraries ---------------------------------------
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
// Reducers ----------------------------------------
import { logIn, logOut } from '../reducers/loginReducer'
import { notifyInfo, notifyWarning, notifyError } from '../reducers/notificationReducer'
// -------------------------------------------------

const LoginForm = props => {
  // This also needs to be a state
  let user = props.user

  // ----------------------------------------

  // Login Handler
  const handleLoginBtn = async e => {
    e.preventDefault()
    try{
      await props.logIn({
        username: e.target.username.value,
        password: e.target.password.value
      })
      await props.notifyInfo('welcome!', 3)
      props.history.push('/')
    } catch(exception){
      // Set Warning Message
      await props.notifyWarning('login faield')
    }
  }

  const handleLogOutBtn = async e => {
    e.preventDefault()
    try{
      await props.logOut()
      user = null
      await props.clearBlogList()
      await props.notifyInfo('logged out', 2)
    } catch(exception){
      // Set warning
      props.notifyError('oops, something went wrong')
    }
  }

  const LoginInputForm = (<div><h2>Log In</h2>
    <Form onSubmit={handleLoginBtn}>
    <Form.Group>
      <div>
        <Form.Label>username</Form.Label>
        <Form.Control name='username' />
      </div>
      <div>
        <Form.Label>password</Form.Label>
        <Form.Control type='password' name='password' />
      </div>
      <Button variant='primary' type="submit">login</Button>
    </Form.Group>
  </Form></div>)

  const LoggedIn = (<p className='logged-in'>
    {`${user === null ? '' : user.username} is logged in.`}
    <button onClick={handleLogOutBtn}>Log Out</button>
  </p>)

  return (<div className='login'>
    { user === null ? LoginInputForm : LoggedIn}
  </div>)
}

const mapStateToProps = state => {
  return {
    user: state.login
  }
}

export default withRouter(connect(
  mapStateToProps,
  { logIn, logOut,
    notifyInfo, notifyWarning, notifyError }
)(LoginForm))