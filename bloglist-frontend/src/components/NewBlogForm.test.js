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

import loginReducer from '../reducers/loginReducer.js'
jest.mock('../reducers/loginReducer.js')

import blogReducer from '../reducers/blogReducer.js'
jest.mock('../reducers/blogReducer.js')
jest.mock('../reducers/notificationReducer.js')

import NewBlogForm from './NewBlogForm.js'

describe('new blog form component', () => {

  const testRouter = combineReducers({
    login: loginReducer,
    blogs: blogReducer
  })
  const testStore = createStore(testRouter, applyMiddleware(thunk))

  const setup = () => {
    const { getByLabelText, getByText } = render(<Provider store={testStore}>
                               <Router>
                                 <NewBlogForm />
                               </Router>
                             </Provider>)

    const title = getByLabelText('title')
    const author = getByLabelText('author')
    const url = getByLabelText('url')
    const button = getByText('post blog')

    return {
      title, author, url, button
    }
  }

  it('registers change', () => {
    // const pushSpy = jest.spyOn(history, 'push')
    const form = setup()
    fireEvent.change(form.title, { target: { value: 'Thus Spake Zarathustra' } })
    expect(form.title.value).toBe('Thus Spake Zarathustra')

    fireEvent.change(form.author, { target: { value: 'Friedrich Nietzsche' } })
    expect(form.author.value).toBe('Friedrich Nietzsche')

    fireEvent.change(form.url, { target: { value: 'http://google.com/' } })
    expect(form.url.value).toBe('http://google.com/')
  })

  it('handles correct input submit', () => {
    const form = setup()
    fireEvent.change(form.title, { target: { value: 'Thus Spake Zarathustra' } })
    fireEvent.change(form.author, { target: { value: 'Friedrich Nietzsche' } })
    fireEvent.change(form.url, { target: { value: 'http:google.com/' }  })

    // This seems to throw error about wrapping with act().
    // Apparently this can be ignored, as described in
    // https://github.com/facebook/react/issues/14769
    act(() => {
      fireEvent.click(form.button)
    })

    expect(testStore.getState().blogs.length).toBe(testHelper.blogsData.length + 1)
  })

})
