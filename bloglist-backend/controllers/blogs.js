const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const User = require('../models/user')

// Get All Blogs
blogsRouter.get('/', async (request, response, next) => {
  try{

    const token = request.token

    // If specific user, get only the blogs for user
    if(token){
      const userBlogs = await Blog
        .find({ user: token.id })
        .populate('user').populate('comments')

      response.json(userBlogs)
    } else {
      const allBlogs = await Blog
        .find({}) // user: token.id
        .populate('user').populate('comments')

      response.json(allBlogs)
    }
  } catch(e){
    next(e)
  }
})

// Get details about a blog with id, 404 if not found
blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const id = request.params.id
    const blog = await Blog
      .findById(id)
      .populate('user')

    if(blog){
      response.json(blog.toJSON())
    } else{
      response.status(404).end()
    }
  } catch(e){
    next(e)
  }
})

// Post new blog
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try{
    const token = request.token
    if(!token){
      return response.status(401).json({ error: 'missing or invalid token' })
    }

    // Get User
    const user = await User.findById(token.id).populate('blogs')
    if(!user) response.status(400).json({ error: 'user not found' })
    // Create Blog object with user id
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    // Save blog to db
    const savedBlog = await newBlog.save()
    // Add blog id to user collection
    user.blogs = [...user.blogs.map( b => b.id ), savedBlog.id]
    await user.save()

    response.status(201).json(savedBlog)
  } catch(e){
    next(e)
  }
})

// Delete blog with id
blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try{
    const token = request.token
    if(!token){
      return response.status(401).json({ error: 'missing or invalid token' })
    }

    const blog = await Blog.findById(id)
    // Check if the token matches user for the blog
    if(blog.user.toString() !== token.id.toString()){
      return response.status(401).json({ error: 'wrong user for blog' })
    }

    // Remove blog
    await blog.remove()

    // Remove blog from User.blogs
    const user = await User.findById(token.id).populate('blogs')
    user.blogs = user.blogs.map( b => b.id )
    await user.save()

    response.status(204).end()
  } catch(e){
    next(e)
  }
})

// Update blog details
blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  try{
    const token = request.token
    if(!token){
      return response.status(401).json({ error: 'missing or invalid token' })
    }

    const blog = await Blog.findById(id)
    if(!blog){
      return response.status(400).json({ error: 'blog not found' })
    } else if(blog.user.toString() !== token.id.toString()){
      return response.status(401).json({ error: 'wrong user for blog' })
    }

    const newBlog = {
      title: body.title ? body.title : blog.title,
      author: body.author ? body.author: blog.author,
      url: body.url ? body.url : blog.url,
      likes: Number(body.likes) ? Number(body.likes) : blog.likes,
      user: token.id
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true, runValidators: true })
    // Add blog id to user collection if it doesn't exist
    const user = await User.findById(updatedBlog.user)
    if(!user.blogs.includes(updatedBlog.id)){
      user.blogs = user.blogs.concat(updatedBlog.id)
      await user.save()
    }

    response.json(updatedBlog.toJSON())
  } catch(e){
    next(e)
  }
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try{
    const id = request.params.id
    const comments = await Comment
      .find({ blog: id })

    response.json(comments)
  } catch(e){
    next(e)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) =>{
  const id = request.params.id
  const body = request.body
  try{
    // Check Blog
    const blog = await Blog
      .findById(id)
      .populate('comments')

    // If blog was not found
    if(!blog){
      response.status(400).json({
        error: 'blog not found'
      })
    }

    const comment = new Comment({
      blog: id,
      comment: body.comment
    })

    const savedComment = await comment.save()

    // update comments field in blogs collection
    console.log('comment saved', savedComment.id)
    console.log(blog)
    blog.comments = [...blog.comments.map(c => c.id), savedComment.id]
    await blog.save()

    response.status(201).json(savedComment)
  } catch(e){
    next(e)
  }
})

blogsRouter.delete('/:id/comments', async (request, response, next) =>{
  const id = request.params.id
  try{
    const comment = await Comment.findById(id)
    if(!comment){
      return response
        .status(400)
        .json({
          error: 'comment not found'
        })
    }

    await comment.remove()

    response.status(204).end()
  } catch(e){
    next(e)
  }
})

module.exports = blogsRouter