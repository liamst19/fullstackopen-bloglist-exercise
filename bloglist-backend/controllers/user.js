const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Passwordvalidator
const passwordFormatIsValid = password => {
  const PASS_REGEX = /.{3,}/
  return PASS_REGEX.test(password)
}

// Get all users
usersRouter.get('/', async (request, response, next) =>{
  try{
    const users = await User.find({}).populate('blogs')
    return response.json(users)
  } catch(e){
    next(e)
  }
})

// Create New User
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    // Check password requirements
    if(!passwordFormatIsValid(body.password)){
      return response.status(400).json({ error: 'Password format is invalid' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // Create User object
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      // blogs: []
    })

    // Save User to db
    console.log('** Creating User', newUser)
    const savedUser = await newUser.save()
    console.log('** User Created', savedUser)

    response.json(savedUser)
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter