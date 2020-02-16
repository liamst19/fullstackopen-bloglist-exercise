import { useResource } from '../hooks/resource'
const usersService = useResource('/api/user')

export const actionType = {
  GET_ALL: 'GET_ALL_USERS',
  CREATE: 'CREATE_USER',
  DELETE: 'DELETE_USER',
  UPDATE: 'UPDATE_USER',
  CLEAR: 'CLEAR_USERS'
}

const reducer = (state = [], action) => {
  switch(action.type){
  case actionType.GET_ALL:
    return action.data
  case actionType.CREATE:
    return [...state, action.user]
  case actionType.DELETE:
    if (state && state.length > 0){
      return state.filter(user => user.id.toString() !== action.id.toString())
    } else {
      return []
    }
  case actionType.UPDATE:
    return state.map(user => user.id === action.user.id ? action.user : user)
  case actionType.CLEAR:
    return []
  default:
    return state
  }
}

export const createUser = user => {
  return async dispatch => {
    dispatch({
      type: actionType.CREATE,
      user: user
    })
  }
}

export const removeUser = id => {
  return async dispatch => {
    dispatch({
      type: actionType.DELETE,
      id: id
    })
  }
}

export const updateUser = user => {
  return async dispatch => {
    dispatch({
      type: actionType.UPDATE,
      user: user
    })
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: actionType.GET_ALL,
      data: users
    })
  }
}

export const clearUsers = () => {
  return async dispatch => {
    dispatch({
      type: actionType.CLEAR
    })
  }
}

export default reducer