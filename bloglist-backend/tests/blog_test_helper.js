const Blog = require('../models/blog')

const newBlog = user => {
  return {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    url: 'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm',
    likes: 65,
    user: user.id
  }
}

const initialBlogs = user => {
  return [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: user.id
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: user.id
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: user.id
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: user.id
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      user: user.id
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: user.id
    }
  ]
}

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: 'Will Remove',
    author: 'WIll Remove',
    url: 'http://google.com/',
    likes: 0
  })

  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const resetBlogsDb = async user => {
  await Blog.deleteMany({})
  const initBlogs = initialBlogs(user)
  const blogObjects = initBlogs.map(blog => new Blog(blog))
  const blogs_promises = blogObjects.map(blog => blog.save())
  await Promise.all(blogs_promises)
}

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingBlogId,
  blogsInDb,
  resetBlogsDb
}