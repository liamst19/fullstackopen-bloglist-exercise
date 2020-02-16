const bcrypt = require('bcrypt')
const User = require('../models/user')

const newUser = {
  username: 'VincentGogh',
  name: 'Vincent van Gogh',
  password: 'sunflowers'
}

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'FullStackOpenExercise'
  }
]

const nonExistingUserId = async () => {
  const user = new User({
    username: 'willremove',
    name: 'Will Remove',
    password: 'WillBeRemovedSoon'
  })

  await user.save()
  await user.remove()

  return user.id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const userInDb = async () => {
  const db = await usersInDb()
  return db[0]
}

const resetUserDb = async () => {
  await User.deleteMany({})
  const pwdh = await bcrypt.hash('password', 10)
  const userObjects = initialUsers
    .map(user => new User({
      username: user.username,
      name: user.name,
      passwordHash: pwdh
    }))
  const users_promises = userObjects.map(user => user.save())
  await Promise.all(users_promises)
}

module.exports = {
  newUser,
  initialUsers,
  nonExistingUserId,
  usersInDb,
  userInDb,
  resetUserDb
}