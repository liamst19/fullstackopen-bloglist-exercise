
export const actionType = {
  NOTIFY: 'NOTIFY',
  CLEAR: 'CLEAR_NOTIFICATION'
}

export const notificationType = {
  NULL: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3
}

const initState = {
  type: notificationType.NULL,
  message: ''
}

const reducer = (state = initState, action) => {
  switch(action.type){
  case actionType.NOTIFY:
    return action.notification
  case actionType.CLEAR:
    return initState
  default:
    return state
  }
}

export const notifyInfo = (message, seconds = 0) => {
  return async dispatch => {

    // If time is set, set timer to clear
    if(seconds > 0){
      setTimeout(() => dispatch({
        type: actionType.CLEAR
      }), seconds * 1000)
    }

    return dispatch({
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.INFO,
        message: message
      }
    })
  }
}

export const notifyWarning = message => {
  return async dispatch => {
    return dispatch({
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.WARNING,
        message: message
      }
    })
  }
}

export const notifyError = message => {
  return async dispatch => {
    return dispatch({
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.ERROR,
        message: message
      }
    })
  }
}

export default reducer
