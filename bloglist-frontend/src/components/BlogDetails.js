// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
// Components --------------------------------------
import BlogComments from './BlogComments'
import NewBlogCommentForm from './NewBlogCommentForm'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
// -------------------------------------------------

const BlogDetails = props => {
  const filteredBlogs = props.blogs.filter(b => b.id.toString() === props.id.toString())

  if(!filteredBlogs || filteredBlogs.length < 1){
    // No user to show
    return (<div>blog not found</div>)
  }

  const handleLikeBtn = async e => {
    e.preventDefault()
    // Increment like
    await props.updateBlog({
      id: blog.id,
      likes: blog.likes + 1
    })
  }

  const handleDeleteBtn = async e => {
    e.preventDefault()
    if(window.confirm(`delete ${blog.title} by ${blog.author}?`)){
      await props.removeBlog(blog.id)
    }
  }

  const blog = filteredBlogs[0]
  return (<div>
    <h2>{`${blog.title} by ${blog.author}`}</h2>
    <div><a href={blog.url}>{blog.url}</a></div>
    <div>{`${blog.likes} likes`}&ensp;<button onClick={handleLikeBtn}>like</button></div>
    <div>Added by {blog.user.name}</div>
    <div><button onClick={handleDeleteBtn}>delete</button></div>
    <div>
      <NewBlogCommentForm blog={blog} />
      <BlogComments comments={blog.comments} />
    </div>
  </div>)
}

const mapStateToProps = state => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { updateBlog, removeBlog }
)(BlogDetails)
