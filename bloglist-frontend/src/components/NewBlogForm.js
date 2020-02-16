// Libraries ---------------------------------------
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
// Hooks -------------------------------------------
import { useField } from '../hooks/index'
// Reducers ----------------------------------------
import { addNewBlog } from '../reducers/blogReducer'
import { notifyInfo, notifyWarning, notifyError } from '../reducers/notificationReducer'
// -------------------------------------------------

const NewBlogForm = (props) => {
  const user = props.user
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const resetForm = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const getBlog = () => {
    return {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      user: user.id
    }
  }

  const submitHandler = async e => {
    e.preventDefault()
    const blog = getBlog()
    // Validate?
    try{
      await props.addNewBlog(blog)
      // Notify
      props.notifyInfo(`Added ${blog.title} by ${blog.author} to list.`, 3)
      resetForm()
      props.history.push('/')
    } catch(e){
      // Failed
      props.notifyError('oops, something went wrong')
    }
  }

  return (<div>
    <h2>Add Blog</h2>
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <div>
          <Form.Label>title</Form.Label>
          <Form.Control name='title' {...title.fields()} />
        </div>
        <div>
          <Form.Label>author</Form.Label>
          <Form.Control name='author' {...author.fields()} />
        </div>
        <div>
          <Form.Label>url</Form.Label>
          <Form.Control name='url' {...url.fields()} />
        </div>
        <Button variant='primary' type="submit">post blog</Button>
      </Form.Group>
    </Form>
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
    addNewBlog,
    notifyInfo, notifyWarning, notifyError
  }
)(NewBlogForm))