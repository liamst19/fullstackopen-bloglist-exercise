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

import testHelper from '../tests/test_helper.js'
import BlogsList from './BlogsList'

describe('BlogList component', () => {
  const testReducer = combineReducers({
    blogs: blogReducer
  })
  const testStore = createStore(testReducer, applyMiddleware(thunk))

  // Prepare Component
  const getComponent = () => {
    const component =
              render(<Provider store={testStore}>
                <Router>
                  <BlogsList blogs={testHelper.blogsData} />
                </Router>
              </Provider>)
    return component
  }

  test('renders component', () => {
    const component = getComponent()
    const blogListContainer = component.container

    // classname 'list-group-item' is from the bootstrap library
    const blogListEntries = blogListContainer.getElementsByClassName('list-group-item')
    expect(blogListEntries.length).toBe(testHelper.blogsData.length)

    const blogListEntry = blogListEntries[0].firstChild
    expect(blogListEntry.textContent).toBe(`${testHelper.blogsData[0].title} by ${testHelper.blogsData[0].author}`)
  })
})
