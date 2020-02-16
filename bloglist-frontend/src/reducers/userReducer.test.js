import deepFreeze from 'deep-freeze'
import userReducer,{ actionType as userActionType } from './userReducer'
import userTestHelper from '../tests/user_test_users_data'

describe('user reducer', () => {
  const initUsers = userTestHelper.usersData.map((u, i) => { return { ...u, id: i }})

  test('undefined state returns default empty', () => {
    const action = {
      type: 'NOTHING_NULL'
    }
    const state = undefined
    const newState = userReducer(state, action)
    expect(newState).not.toBeUndefined()
    expect(newState).not.toBeNull()
    expect(newState).toEqual([])
  })

  test('create user', () => {
    const action = {
      type: userActionType.CREATE,
      user: userTestHelper.newUserData,
      id: initUsers.length
    }
    const state = initUsers
    deepFreeze(state)
    const newState = userReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState).toContainEqual(userTestHelper.newUserData)
  })

  test('delete user', () => {
    const action = {
      type: userActionType.DELETE,
      id: initUsers[0].id
    }
    const state = initUsers
    deepFreeze(state)
    const newState = userReducer(state, action)
    expect(newState.length).toBe(state.length - 1)
    expect(newState).not.toContainEqual(initUsers[0])
  })

  test('update user', () => {
    const action = {
      type: userActionType.UPDATE,
      user: { ...initUsers[0],
        name: 'UPDATED NAME' }
    }
    const state =  initUsers
    deepFreeze(state)
    const newState = userReducer(state, action)
    expect(newState.length).toBe(state.length)
    expect(newState[0].name).toBe('UPDATED NAME')
  })

})