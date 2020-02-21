import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import testHelper from '../tests/test_helper.js'

import blogReducer from '../reducers/blogReducer.js'
import userReducer from '../reducers/userReducer.js'
jest.mock('../reducers/blogReducer.js')
jest.mock('../reducers/userReducer.js')

jest.mock('./BlogsList.js')

import UserDetails from './UserDetails.js'

describe('User Details component', () => {

  const user = testHelper.usersData[0]
  const testReducer = combineReducers({
    blogs: blogReducer,
    users: userReducer
  })
  const testStore = createStore(testReducer, applyMiddleware(thunk))

  const getComponent = user_id => render(<Provider store={testStore}>
                               <Router>
                                 <UserDetails id={user_id} />
                               </Router></Provider>)

  test('if valid user id is passed show user name', () => {
    const component = getComponent(user.id)
    const header = component.container.getElementsByTagName('h2')[0]
    expect(header.textContent).toBe(user.name)
  })

  test('if invalid user id passed show message', () => {
    const id = 'wahwah_wrong_id'
    const component = getComponent(id)
    const div = component.container
    expect(div.textContent).toBe('user not found')
  })

})
