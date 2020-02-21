import testHelper from '../../tests/test_helper.js'

export const actionType = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT'
}

const reducer = (state = testHelper.newUserData, action) => {
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
    const user = testHelper.newUserData
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
    const newUser = user
    dispatch({
      type: actionType.LOG_IN,
      user: newUser
    })
  }
}

export const logIn = userCredentials => {
  return async dispatch => {
    const loginUser = userCredentials
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
