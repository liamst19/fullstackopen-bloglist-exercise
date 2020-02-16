import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import { blogsData as testBlogsData } from '../tests/blog_test_blogs_data'
import BlogsList from './BlogsList'

describe('BlogList component', () => {

  // Generate Test Blogs Data
  const testBlogs = testBlogsData(0) 
  
  // Prepare Component
  const getComponent = () => {
    const testReducer = (state, action) => {
      return state
    }
    const testStore = createStore(testReducer)
    const component = 
              render(<Provider store={testStore}>
                      <Router>
                        <BlogsList blogs={testBlogs} />
                      </Router>
                     </Provider>)
    return component
  }

  test('renders component', () => {
    const component = getComponent(testBlogs)
    const blogListContainer = component.container

    // classname 'list-group-item' is from the bootstrap library
    const blogListEntries = blogListContainer.getElementsByClassName('list-group-item')
    expect(blogListEntries.length).toBe(testBlogs.length)

    const blogListEntry = blogListEntries[0].firstChild
    expect(blogListEntry.textContent).toBe(`${testBlogs[0].title} by ${testBlogs[0].author}`)
  })
  
})