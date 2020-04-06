import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import userReducer from '../reducers/userReducer.js'
jest.mock('../reducers/userReducer.js')

import testHelper from '../tests/test_helper.js'

import UsersList from './UsersList'

describe('UsersList component', () => {

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

  beforeEach(() => {

  })

  afterEach(() => {
    cleanup()
  })

  test('component renders', () => {
    const component = render(<Provider store={testStore()}>
                              <Router>
                                <UsersList />
                              </Router></Provider>)
    const tableRows = component.container.getElementsByTagName('tbody')[0].children
    expect(tableRows.length).toBe(testHelper.usersData.length)
    expect(tableRows.length).toBe(usersData.length)

  })
})
