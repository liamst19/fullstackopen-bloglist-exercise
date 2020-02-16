/* Blogs.tests.js
 *
 * This tests the Blogs.js component, and is part of
 * exercise 5.15:
 *
 *   Write tests for the Blog component of your
 *   application that verify that only the name
 *   and author of the blog post are shown by default.
 *   Also verify that when the blog post is clicked,
 *   the other information of the blog post becomes
 *   visible.
 *
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Blogs from './Blogs'

test('renders content', () => {

  const testBlogs = [{
    id: 'mock-id-1',
    title: 'mock one',
    author: 'mock one author',
    url: 'mock url one',
    likes: 1,
    user: {
      name: 'mock user one',
      id: 'mock-usr-id-1'
    }
  },
  {
    id: 'mock-id-2',
    title: 'mock two',
    author: 'mock two author',
    url: 'mock url two',
    likes: 2,
    user: {
      name: 'mock user two',
      id: 'mock-usr-id-2'
    }
  }]

  const newBlogMock = jest.fn()
  const updateBlogMock = jest.fn()
  const deleteBlogMock = jest.fn()
  const messageBlogMock = jest.fn()

  const component = render(
    <Blogs
      blogs={testBlogs}
      handleNewBlogSubmit={newBlogMock}
      handleBlogUpdate={updateBlogMock}
      handleBlogDelete={deleteBlogMock}
      setMessage={messageBlogMock} />
  )

  const divContainer = component.container
  const blogList = divContainer.getElementsByTagName('li')

  expect(blogList.length).toBe(2)
  const blog = blogList[0]
  const title = blog.getElementsByClassName('blog-title')[0]
  const details = blog.getElementsByClassName('blog-details')[0]

  expect(details).toHaveStyle('display: none')

  fireEvent.click(title)

  expect(details).not.toHaveStyle('display: none')
})