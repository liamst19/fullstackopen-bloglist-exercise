const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./user_test_helper')

const apiPath = '/api/user'

const User = require('../models/user')

// Reset database before every test
beforeEach(async () => {
  await helper.resetUserDb()
})

// Tests ----------------------------------------

describe('when there is only one user in db', () => {

  test('creating fresh user succeeds with new username', async () => {
    const startingUsers = await helper.usersInDb()

    await api
      .post(apiPath)
      .send(helper.newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endingUsers = await helper.usersInDb()

    expect(endingUsers.length).toBe(startingUsers.length + 1)
    const userNames = endingUsers.map(user => user.username)
    expect(userNames).toContain(helper.newUser.username) 
  })

  test('creating fresh user fails with existing username', async () => {
    const startingUsers = await helper.usersInDb()

    const newUser = {
      username: helper.initialUsers[0].username,
      name: 'Whatever Name',
      password: 'whateverwhatever'
    }

    const result = await api
      .post(apiPath)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const endingUsers = await helper.usersInDb()
    expect(endingUsers.length).toBe(startingUsers.length)
  })

  test('creating fresh user fails with invalid password format', async () => {
    const startingUsers = await helper.usersInDb()

    const newUser = {
      username: helper.newUser.username,
      name: helper.newUser.name,
      password: 'bp'
    }

    const result = await api
      .post(apiPath)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endingUsers = await helper.usersInDb()
    expect(endingUsers.length).toBe(startingUsers.length)
  })

})

// ----------------------------------------
afterAll(() => {
  mongoose.connection.close()
})