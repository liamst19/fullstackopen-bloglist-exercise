import { useResource } from '../hooks/resource'

const blogService = useResource('/api/blogs')

export const actionType = {
  CREATE: 'ADDNEW_BLOG',
  READ_ALL: 'GETALL_BLOGS',
  UPDATE: 'UPDATE_BLOG',
  DELETE: 'DELETE_BLOG',
  CLEAR: 'CLEAR_BLOGS'
}

const reducer = (state = [], action) => {
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
    const newBlog = await blogService.create(blog)
    return dispatch({
      type: actionType.CREATE,
      content: newBlog
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    console.log(updatedBlog)
    return dispatch({
      type: actionType.UPDATE,
      content: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    return dispatch({
      type: actionType.DELETE,
      id: id
    })
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    return dispatch({
      type: actionType.READ_ALL,
      data: blogs
    })
  }
}

export const clearBlogList = () => {
  console.log('clearing')
  return async dispatch => {
    return dispatch({
      type: actionType.CLEAR
    })
  }
}

export default reducer