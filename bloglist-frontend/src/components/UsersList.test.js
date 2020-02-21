import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

<<<<<<< HEAD
import userReducer from '../reducers/userReducer.js'
jest.mock('../reducers/userReducer.js')

import testHelper from '../tests/test_helper.js'

=======
>>>>>>> fad1ea8... cypress setup
import UsersList from './UsersList'

describe('UsersList component', () => {

<<<<<<< HEAD
  const testReducer = combineReducers({
    users: userReducer
  })

  const testStore = createStore(testReducer, applyMiddleware(thunk))
=======
  const usersData = [
    {
      id: 0,
      username: 'root',
      name: 'Superuser',
      blogs: [1, 2, 3, 4, 5]
    },
    {
      id: 1,
      username: 'picasso',
      name: 'pablo picasso',
      blogs: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      username: 'gauguin',
      name: 'Paul Gauguin',
      blogs: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      username: 'rembrandt',
      name: 'Rembrandt van Rijn',
      blogs: [1, 2, 3, 4, 5]
    }
  ]

  const testUsers = usersData

  const testStore = () => {
    const testReducer = combineReducers({
      users: (state = [], action = '') => {
        return testUsers
      }
    })

    return createStore(testReducer, applyMiddleware(thunk))
  }
>>>>>>> fad1ea8... cypress setup

  beforeEach(() => {

  })

  afterEach(() => {
    cleanup()
  })

  test('component renders', () => {
<<<<<<< HEAD
    const component = render(<Provider store={testStore}>
=======
    const component = render(<Provider store={testStore()}>
>>>>>>> fad1ea8... cypress setup
                              <Router>
                                <UsersList />
                              </Router></Provider>)
    const tableRows = component.container.getElementsByTagName('tbody')[0].children
<<<<<<< HEAD
    expect(tableRows.length).toBe(testHelper.usersData.length)
=======
    expect(tableRows.length).toBe(usersData.length)
>>>>>>> fad1ea8... cypress setup

  })
})
