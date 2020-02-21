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

jest.mock('../hooks/resource.js')

import loginReducer from '../reducers/loginReducer.js'
jest.mock('../reducers/loginReducer.js')

import notificationReducer from '../reducers/notificationReducer.js'
jest.mock('../reducers/notificationReducer.js')

import NewBlogCommentForm from './NewBlogCommentForm.js'

describe('new blog comment form component', () => {

  const testReducer = combineReducers({
    login: loginReducer,
    notification: notificationReducer
  })
  const testStore = createStore(testReducer, applyMiddleware(thunk))

  const getComponent = () => {
    const {container, getByLabelText } = render(<Provider store={testStore}>
                               <Router>
                                 <NewBlogCommentForm blog={testHelper.newBlogData} />
                               </Router>
                             </Provider>)
    const form = container.querySelector('form')
    return {
      container,
      input: container.querySelector('input'),
      button: container.querySelector('button'),
      form: form
    }
  }

  it('should submit new comment', () => {
    const { input, button, form } = getComponent()
    fireEvent.change(input, { target: { value: 'test comment' } })
    expect(input.value).toBe('test comment')
  })

})
