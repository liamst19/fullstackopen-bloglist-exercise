// Libraries ---------------------------------------
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// Hooks -------------------------------------------
import { useField } from '../hooks/index'
import { useResource } from '../hooks/resource'
// Reducers ----------------------------------------
import { notifyInfo, notifyWarning, notifyError } from '../reducers/notificationReducer'
// -------------------------------------------------

const NewBlogCommentForm = (props) => {
  const blog = props.blog
  const comment = useField('text')
  const commentService = useResource(`/api/blogs/${blog.id}/comments`)

  const resetForm = () => {
    comment.reset()
  }

  const getComment = () => {
    return {
      blog: blog.id,
      comment: comment.value
    }
  }

  const submitHandler = async e => {
    e.preventDefault()
    const comment = getComment()

    // Validate?
    try{
      commentService.create(comment)
      resetForm()
    } catch(e){
      // Failed
      props.notifyError('oops, something went wrong')
    }
  }

  return (<div>
    <h4>Add Comment</h4>
    <form onSubmit={submitHandler}>
      <input {...comment.fields()} />
      <button type="submit">post comment</button>
    </form>
  </div>)
}

const mapStateToProps = state => {
  return {
    user: state.login
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    notifyInfo, notifyWarning, notifyError
  }
)(NewBlogCommentForm))
