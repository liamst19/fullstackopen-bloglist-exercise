const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const blogTestHelper = require('./blog_test_helper')
const userTestHelper = require('./user_test_helper')

const apiPath = '/api/blogs'

// const Blog = require('../models/blog')
// const User = require('../models/user')

// Reset database before every test
beforeEach(async () => {
  jest.setTimeout(30000)
  // Users must be reset before blogs, because latter needs userid
  await userTestHelper.resetUserDb()

  // Get User Id
  const user = await userTestHelper.userInDb()
  if(!user) throw new Error('user was empty')

  await blogTestHelper.resetBlogsDb(user)
})

// Custom matcher for matching objects
// From: https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
expect.extend({
  toContainObject(received, argument) {

    const pass = this.equals(received,
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    )

    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
        pass: false
      }
    }
  }
})

// ----------------------------------------

test('ex-4.08', async () => {
  await api
    .get(apiPath)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('ex-4.09', async () => {
  /* Write a test that verifies that the unique
     identifier property of the blog posts is named
     id, by default the database names the property
     _id. Verifying the existence of a property is
     easily done with Jest's toBeDefined matcher. */

  const user = await userTestHelper.userInDb()
  const newBlog = blogTestHelper.newBlog(user)

  expect(newBlog.user).toBeDefined()

  const response = await api
    .post(apiPath)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBeDefined()
})

test('ex-4.10', async () => {
  /* Write a test that verifies that making an
     HTTP POST request to the /api/blogs url
     successfully creates a new blog post. At
     the very least, verify that the total number
     of blogs in the system is increased by one.
     You can also verify that the content of the
     blog post is saved correctly to the database. */
  const user = await userTestHelper.userInDb()
  const startingBlogs = await blogTestHelper.blogsInDb()
  const newBlog = blogTestHelper.newBlog(user)

  const response = await api
    .post(apiPath)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const endingBlogs = await blogTestHelper.blogsInDb()
  const blogs = endingBlogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.toString()
    }
  })

  expect(endingBlogs.length).toBe(startingBlogs.length + 1)
  expect(blogs).toContainEqual(newBlog)

  // Check User if blog id is inserted
  const users = await userTestHelper.usersInDb()
  const testUser = users.find(u => u.id === user.id)
  const ublogs = testUser.blogs.map(b => b.toString())
  expect(ublogs).toContain(response.body.id)
})

test('ex-4.11', async () => {
  /* Write a test that verifies that if the likes
  property is missing from the request, it will
  default to the value 0. */

  const user = await userTestHelper.userInDb()
  const newBlog = {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    url: 'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm',
    user: user.id
  }

  const response = await api
    .post(apiPath)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('ex-4.12', async () => {
  /* Write a test related to creating new blogs
     via the /api/blogs endpoint, that verifies
     that if the title and url properties are
     missing from the request data, the backend
     responds to the request with the status code
     400 Bad Request. */

  const newBlog = {
    author: 'Fyodor Dostoevsky'
  }

  await api
    .post(apiPath)
    .send(newBlog)
    .expect(400)
})

test('ex-4.13', async () => {
  /* Implement functionality for deleting a single
     blog post resource.

     Use the async/await syntax. Follow RESTful
     conventions when defining the HTTP API.

     Feel free to implement tests for the functionality
     if you want to. Otherwise verify that the
     functionality works with Postman or some other tool. */
  const startingBlogs = await blogTestHelper.blogsInDb()

  // Add New Blog
  const user = await userTestHelper.userInDb()
  const newBlog = blogTestHelper.newBlog(user)
  const response = await api
    .post(apiPath)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Make sure the blog was added
  const beginBlogs = await blogTestHelper.blogsInDb()
  const beginBlogsF = beginBlogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.toString()
    }
  })
  expect(beginBlogsF.length).toBe(startingBlogs.length + 1)
  expect(beginBlogsF).toContainObject(newBlog)

  // Get the id of the added blog
  const addedId = response.body.id

  // Delete that blog with the id of returned object
  await api
    .delete(apiPath + `/${addedId}`)
    .expect(204)

  // Check that the blog is gone
  const endingBlogs = await blogTestHelper.blogsInDb()
  const endingBlogsF = endingBlogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.toString()
    }
  })

  expect(endingBlogsF.length).toBe(startingBlogs.length)
  expect(endingBlogsF).not.toContainEqual(newBlog)
})

test('ex-4.14', async () => {
  /* Implement functionality for updating the information
     of an individual blog post. */

  const startingBlogs = await blogTestHelper.blogsInDb()
  const blogToUpdate = startingBlogs[0]
  const updateBlogInfo = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
    user: blogToUpdate.user
  }

  const response = await api
    .put(apiPath + `/${blogToUpdate.id}`)
    .send(updateBlogInfo)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Check returned object
  expect(response.body.likes).toBe(blogToUpdate.likes + 1)

  // Check Database
  const response2 = await api
    .get(apiPath + `/${blogToUpdate.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response2.body.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})