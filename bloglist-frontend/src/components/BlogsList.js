// Libraries ---------------------------------------
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
// -------------------------------------------------

const BlogsList = props => {
  return (<ListGroup>
    {props.blogs.map(blog =>
      <ListGroup.Item key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {`${blog.title} by ${blog.author}`}
        </Link>
      </ListGroup.Item>
    )}
  </ListGroup>)
}

export default connect()(BlogsList)