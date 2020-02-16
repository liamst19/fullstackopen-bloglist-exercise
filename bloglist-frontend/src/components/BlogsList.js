// Libraries ---------------------------------------
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
// -------------------------------------------------

const BlogsList = props => {
  return (<div className='blogs-list'>
    <ListGroup>
      {props.blogs.map(blog =>
        <ListGroup.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`} blog={blog}>{`${blog.title} by ${blog.author}`}</Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  </div>)
}

export default connect()(BlogsList)