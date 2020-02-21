/* __mocks__/blogReducer.js
 *
 * Mock version of blogsReducer, without the api calls
 *
 */

import testHelper from '../../tests/test_helper.js'

export const actionType = {
  CREATE: 'ADDNEW_BLOG',
  READ_ALL: 'GETALL_BLOGS',
  UPDATE: 'UPDATE_BLOG',
  DELETE: 'DELETE_BLOG',
  CLEAR: 'CLEAR_BLOGS'
}

const reducer = (state = testHelper.blogsData, action) => {
  switch(action.type){
  case actionType.CREATE:
    return [...state, action.content]
  case actionType.UPDATE:
    return state.map(b => b.id === action.content.id ? action.content : b)
  case actionType.DELETE:
    return state.filter(b => b.id !== action.id)
  case actionType.READ_ALL:
    return action.data
  case actionType.CLEAR:
    return []
  default:
    return state
  }
}

export const addNewBlog = blog => {
  return async dispatch => {
    const newBlog = blog
    return dispatch({
      type: actionType.CREATE,
      content: newBlog
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = blog
    return dispatch({
      type: actionType.UPDATE,
      content: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    return dispatch({
      type: actionType.DELETE,
      id: id
    })
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = testHelper.blogsData
    return dispatch({
      type: actionType.READ_ALL,
      data: blogs
    })
  }
}

export const clearBlogList = () => {
  return async dispatch => {
    return dispatch({
      type: actionType.CLEAR
    })
  }
}

export default reducer
