import notificationReducer, { actionType, notificationType } from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notification reducer', () => {

  test('notify info', () => {
    const action = {
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.INFO,
        message: 'info test message 12345'
      }
    }

    const state = null
    const newState = notificationReducer(state, action)
    expect(newState).not.toBeNull()
    expect(newState.type).toBe(notificationType.INFO)
    expect(newState.message).toBe('info test message 12345')
  })

  test('notify warning', () => {
    const action = {
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.WARNING,
        message: 'warning test message 12345'
      }
    }

    const state = null
    const newState = notificationReducer(state, action)
    expect(newState).not.toBeNull()
    expect(newState.type).toBe(notificationType.WARNING)
    expect(newState.message).toBe('warning test message 12345')
  })

  test('notify error', () => {
    const action = {
      type: actionType.NOTIFY,
      notification: {
        type: notificationType.ERROR,
        message: 'error test message 12345'
      }
    }

    const state = null
    const newState = notificationReducer(state, action)
    expect(newState).not.toBeNull()
    expect(newState.type).toBe(notificationType.ERROR)
    expect(newState.message).toBe('error test message 12345')
  })

  test('clear notification', () => {
    const action = {
      type: actionType.CLEAR
    }
    const state =  {
      type: notificationType.INFO,
      message: 'test message 12345'
    }
    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState.type).toBe(notificationType.NULL)
  })
})
