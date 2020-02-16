// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
// Components --------------------------------------
import BlogsList from './BlogsList'
// -------------------------------------------------

const Blogs = (props) => {
  const blogs = props.user ? props.blogs.filter(b => b.user.username === props.user.username) : props.blogs
  const blogListTitle = props.user ? 'My Blogs' : 'All Blogs'
  const NoBlogs = <div>There are no blogs to show</div>

  return (<div className='blogs'>
    {blogs.length > 0 ? <div><h2>{blogListTitle}</h2><BlogsList blogs={blogs} /></div> : NoBlogs}
  </div>)
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

export default connect(
  mapStateToProps,
  {}
)(Blogs)