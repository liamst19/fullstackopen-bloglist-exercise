// Libraries ---------------------------------------
import React from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
// -------------------------------------------------

const BlogComments = props => {
  if(!props.comments || props.comments.length < 1){
    return null
  }
  return (<div className='blogs-list'>
    <h3>Comments</h3>
    <ListGroup>
      {props.comments.map(comment =>
        <ListGroup.Item key={comment.id}>
          {comment.comment}
        </ListGroup.Item>
      )}
    </ListGroup>
  </div>)
}

export default connect()(BlogComments)