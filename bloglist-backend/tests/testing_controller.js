const bcrypt = require('bcrypt')
const testsRouter = require ('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const testBlogsData = require('./blog_test_blogs_data')
const testUsersData = require('./user_test_users_data')

const randomIndex = (max) => Math.floor((Math.random() * max))

/* resetBlogs()
 * Clears blogs collection and populates with initial blogs
 */
const resetBlogs = async (users) => {
  console.log('   - Resetting Blogs Db')
  await Blog.deleteMany({})
  // repopulate blogs with default, using random user ids
  const blogs = testBlogsData.blogsData({ id: '1' }).map(
    blog => {
      return {
        ...blog,
        user: users[randomIndex(users.length)].id
      }
    }
  )
  const blogObjects = blogs.map(blog => new Blog(blog))
  const blogs_promises = blogObjects.map(blog => blog.save())
  return await Promise.all(blogs_promises)
}

/* resetUsers()
 * Clears users collection and populates with initial users
 */
const resetUsers = async () => {
  console.log('   - Resetting User Db')
  await User.deleteMany({})
  const saltRounds = 10

  const users = testUsersData.usersData
  // add hashed passwords to all users
  const hash_promises = users.map(
    user => bcrypt.hash(user.password, saltRounds)
  )
  const hashedPasswords = await Promise.all(hash_promises)

  // Insert hashed passwords into users data
  const usersWithHash = users.map((user, idx) => {
    return {
      ...user,
      passwordHash: hashedPasswords[idx]
    }
  })

  // Add Users to Db
  const userObjects = usersWithHash
    .map(user => {
      return new User({
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash
      })
    })
  const users_promises = userObjects.map(user => user.save())
  return await Promise.all(users_promises)
}

testsRouter.post('/reset', async (request, response, next) => {
  console.log('** RESETTING DATABASE')
  try{
    const users = await resetUsers()
    const blogs = await resetBlogs(users)

    console.log('   - Updating User DB to include blogs')
    // update users for blogs
    users.forEach(user => {
      user.blogs = blogs.filter(blog => blog.user.toString() === user.id.toString())
    })
    const updatedUsers_promises = users.map(user => user.save())
    await Promise.all(updatedUsers_promises)

    console.log('  == All Done ==')
    response.status(200).end()
  } catch (e){
    next(e)
  }
})

testsRouter.get('/blogs', async (request, response, next) => {
  try{
    const blogs = await Blog
      .find({})
      .populate('user')

    response.json(blogs)
  } catch(e){
    next(e)
  }
})

testsRouter.get('/users', async (request, response, next) => {
  try{
    const users = await User
      .find({})
      .populate('user')

    response.json(users)
  } catch(e){
    next(e)
  }
})

module.exports = testsRouter