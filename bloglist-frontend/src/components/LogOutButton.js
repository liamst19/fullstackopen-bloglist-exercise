// Libraries ---------------------------------------
import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// Reducers ----------------------------------------
import { logOut } from '../reducers/loginReducer'
import { clearBlogList } from '../reducers/blogReducer'
import { notifyInfo, notifyWarning, notifyError } from '../reducers/notificationReducer'
// -------------------------------------------------

const LogoutButton = props => {
  let user = props.user
  const style = {
    color: '#FFF'
  }

  const handleLogout = async e => {
    e.preventDefault()
    try{
      await props.logOut()
      user = null
      await props.notifyInfo('logged out', 2)
      props.history.push('/login')
    } catch(exception){
      // Set warning
      props.notifyError('oops, something went wrong')
    }
  }

  if(user){
    return (<span style={style}>
            logged in as <b style={{ color: 'green' }}>{user.username}</b>
            &ensp;<button onClick={handleLogout}>logout</button>
    </span>)
  } else {
    return <Link to='/login'>login</Link>
  }
}

const mapStateToProps = state => {
  return {
    user: state.login
  }
}

export default withRouter(connect(
  mapStateToProps,
  { logOut, clearBlogList,
    notifyInfo, notifyWarning, notifyError }
)(LogoutButton))