// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
// Components --------------------------------------
import BlogsList from './BlogsList'
// -------------------------------------------------

const UserDetails = props => {
  const filteredUsers = props.users.filter(u => u.id.toString() === props.id.toString())

  if(!filteredUsers || filteredUsers.length < 1){
    // No user to show
    return (<div>user not found</div>)
  }

  const user = filteredUsers[0]
  return (<div>
    <h2>{user.name}</h2>
    <h3>blogs created</h3>
    <BlogsList blogs={props.blogs.filter(b => b.user.id === props.id)} />
  </div>)
}

const mapStateToProps = state => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(UserDetails)