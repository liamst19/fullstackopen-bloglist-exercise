import loginReducer, { actionType } from './loginReducer'
import deepFreeze from 'deep-freeze'

describe('login reducer', () => {
  const testUser = {
    username: 'tester',
    token: '1231231214',
    name: 'Donald Tester'
  }

  beforeEach(() => {
    window.localStorage.clear()
  })

  test('log in', () => {
    const action = {
      type: actionType.LOG_IN,
      user: testUser
    }

    const state = null
    const newState = loginReducer(state, action)
    expect(newState).not.toBeNull()
    expect(newState.username).toBe('tester')
    expect(newState.token).toBe('1231231214')
    expect(newState.name).toBe('Donald Tester')
  })

  test('log out', () => {
    const action = {
      type: actionType.LOG_OUT
    }

    // Log In
    const state = loginReducer(null, {
      type: actionType.LOG_IN,
      user: testUser
    })
    expect(state).not.toBeNull()
    expect(state.username).toBe('tester')
    expect(state.token).toBe('1231231214')
    expect(state.name).toBe('Donald Tester')
    deepFreeze(state)

    // Log Out
    const newState = loginReducer(state, action)
    expect(newState).toBeNull()
  })

})