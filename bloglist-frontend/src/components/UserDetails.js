// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
// Components --------------------------------------
import BlogsList from './BlogsList'
// -------------------------------------------------

const UserDetails = ({ id, users, blogs }) => {
  const filteredUsers = users.filter(u => u.id.toString() === id.toString())

  if(!filteredUsers || filteredUsers.length < 1){
    // No user to show
    return (<div>user not found</div>)
  }

  const user = filteredUsers[0]

  // Filter blogs for user
  const filteredBlogs = blogs.filter(b => b.user.id === id)

  return (<div>
    <h2>{user.name}</h2>
    <h3>blogs created</h3>
    <BlogsList blogs={filteredBlogs} />
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
