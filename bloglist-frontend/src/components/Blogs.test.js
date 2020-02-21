
import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import blogReducer from '../reducers/blogReducer.js'
jest.mock('../reducers/blogReducer.js')
import loginReducer from '../reducers/loginReducer.js'
jest.mock('../reducers/loginReducer.js')

import testHelper from '../tests/test_helper.js'
import Blogs from './Blogs'

describe('Blogs component', () => {

  // Generate Test Blogs Data
  const testReducer = combineReducers({
    blogs: blogReducer,
    login: loginReducer
  })

  const testStore = createStore(testReducer, applyMiddleware(thunk))

  // Prepare Component
  const getComponent = () => {
    const component =
              render(<Provider store={testStore}>
                <Router>
                  <Blogs />
                </Router>
              </Provider>)
    return component
  }

  test('renders component with user logged in', () => {
    const component = getComponent()
    const container = component.container

    // classname 'list-group-item' is from the bootstrap library
    const blogListEntries = container.getElementsByClassName('list-group-item')
    expect(blogListEntries.length).toBe(testHelper.blogsData.length)

    const blogListEntry = blogListEntries[0].firstChild
    expect(blogListEntry.textContent).toBe(`${testHelper.blogsData[0].title} by ${testHelper.blogsData[0].author}`)
  })

  test('renders component with no data', () => {
    const component = getComponent()
    const container = component.container

    // classname 'list-group-item' is from the bootstrap library
    const blogListEntries = container.getElementsByClassName('list-group-item')
    expect(blogListEntries.length).not.toBe(testHelper.blogsData.length)

    // There should be a message for no content
    expect(container.textContent).toBe('There are no blogs to show')
  })
})
