import loginService from '../services/login'

export const actionType = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT'
}

const reducer = (state = null, action) => {
  switch(action.type){
  case actionType.LOG_IN:
    return action.user
  case actionType.LOG_OUT:
    return null
  default:
    return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = loginService.getUser()
    if(user){
      dispatch({
        type: actionType.LOG_IN,
        user: user
      })
    } else {
      dispatch({ type: actionType.LOG_OUT })
    }
  }
}

export const newUser = user => {
  return async dispatch => {
    const newUser = await loginService.newUser(user)
    dispatch({
      type: actionType.LOG_IN,
      user: newUser
    })
  }
}

export const logIn = userCredentials => {
  return async dispatch => {
    const loginUser = await loginService.login(userCredentials)
    // Set User
    dispatch({
      type: actionType.LOG_IN,
      user: loginUser
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    // Clear credentials from Browser
    window.localStorage.clear()
    dispatch({
      type: actionType.LOG_OUT
    })
  }
}

export default reducer
