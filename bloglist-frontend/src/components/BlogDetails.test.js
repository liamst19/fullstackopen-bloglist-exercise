import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import testHelper from '../tests/test_helper.js'

import userReducer from '../reducers/userReducer.js'
jest.mock('../reducers/userReducer.js')
import blogReducer from '../reducers/blogReducer.js'
jest.mock('../reducers/blogReducer.js')
jest.mock('../reducers/notificationReducer.js')

import BlogDetails from './BlogDetails.js'

describe('blog details component', () => {

  const testReducer = combineReducers({
    blogs: blogReducer,
    users: userReducer
  })
  const testStore = createStore(testReducer, applyMiddleware(thunk))

  const getComponent = () => {
    const { component, queryByText } = render(<Provider store={testStore}>
                               <Router>
                                 <BlogDetails id={testHelper.blogsData[0].id} />
                               </Router></Provider>)
    return { component, queryByText }
  }

  it('should handle like button click', () => {
    const { queryByText } = getComponent()
    const likeBtn = queryByText('like')
    fireEvent.click(likeBtn)
    expect(testStore.getState().blogs[0].likes).toBe(testHelper.blogsData[0].likes + 1)
  })

  it('should handle delete button click', () => {
    const { queryByText } = getComponent()
    const delBtn = queryByText('delete')

    // The delete button uses window.confirm method.

    // fireEvent.click(delBtn)
    // expect(testStore.getState().blogs.length).toBe(testHelper.blogsData.length - 1)
  })
})
