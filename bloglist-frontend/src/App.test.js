import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

beforeEach(() => {
  logout()
})

const login = () => {
  const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Donald Tester'
  }

  window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
}

const logout = () => {
  window.localStorage.clear()
}

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('form')
    )

    const blogDiv = component.container.querySelector('.blogs')
    const loginDiv = component.container.querySelector('.login')
    const loginForm = loginDiv.querySelector('form')

    // expectations here

    // Check unauthenticated state
    expect(blogDiv).toBeNull()
    expect(loginForm).not.toBeNull()
  })

  test('if user is logged in, blogs are rendered, login form is not', async () => {

    login()

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.login').querySelector('p')
    )
    const blogDiv = component.container.querySelector('.blogs')
    const loginDiv = component.container.querySelector('.login')
    const loginForm = loginDiv.querySelector('form')

    // expectations here
    // Check unauthenticated state
    expect(blogDiv).not.toBeNull()
    expect(loginForm).toBeNull()
  })
})