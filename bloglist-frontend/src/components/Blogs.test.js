
import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import { blogsData as testBlogsData } from '../tests/blog_test_blogs_data'
import { newUserData as userData } from '../tests/user_test_users_data'
import Blogs from './Blogs'

describe('Blogs component', () => {

  // Generate Test Blogs Data
  const testUser = { ...userData, token: 'test-token' }
  const testBlogs = testBlogsData(testUser)

  const testStore = (user, blogs) => {
    const testReducer = (user, blogs) => combineReducers({
      blogs: (state = testBlogs, action) => {
        return blogs? testBlogs : []
      },
      login: (state = testUser, action) => {
        return  user? testUser : null
      }
    })
    return createStore(testReducer(user, blogs), applyMiddleware(thunk))
  }

  // Prepare Component
  const getComponent = (user = true, blogs = true) => {
    const component =
              render(<Provider store={testStore(user, blogs)}>
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
    expect(blogListEntries.length).toBe(testBlogs.length)

    const blogListEntry = blogListEntries[0].firstChild
    expect(blogListEntry.textContent).toBe(`${testBlogs[0].title} by ${testBlogs[0].author}`)
  })

  test('renders component with no data', () => {
    const component = getComponent(false, false)
    const container = component.container

    // classname 'list-group-item' is from the bootstrap library
    const blogListEntries = container.getElementsByClassName('list-group-item')
    expect(blogListEntries.length).not.toBe(testBlogs.length)

    // There should be a message for no content
    expect(container.textContent).toBe('There are no blogs to show')
  })
})