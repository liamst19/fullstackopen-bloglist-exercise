
const newUserData = {
  id: 9,
  token: 'test-token-9',
  username: 'VincentGogh',
  name: 'Vincent van Gogh',
  password: 'sunflowers'
}

const usersData = [
  {
    id: 1,
    token: 'test-token-9',
    username: 'root',
    name: 'Superuser',
    password: 'FullStackOpenExercise',
    blogs: [0, 1, 2, 3]
  },
  {
    id: 2,
    token: 'test-token-9',
    username: 'picasso',
    name: 'pablo picasso',
    password: 'guernica',
    blogs: [1]
  },
  {
    id: 3,
    token: 'test-token-9',
    username: 'gauguin',
    name: 'Paul Gauguin',
    password: 'tahiti',
    blogs: [3, 4, 5, 6, 7, 8]
  },
  {
    id: 4,
    token: 'test-token-9',
    username: 'rembrandt',
    name: 'Rembrandt van Rijn',
    password: 'nightwatch',
    blogs: []
  }
]

// ----------------------------------------
// ----------------------------------------
// ----------------------------------------

const newBlogData = {
  id: 11,
  title: 'Crime and Punishment',
  author: 'Fyodor Dostoevsky',
  url: 'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm',
  likes: 65,
  user: usersData[0]
}

const blogsData = [
  {
    id: 1,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: usersData[0]
  },
  {
    id: 2,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: usersData[1]
  },
  {
    id: 3,
    title: 'canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: usersData[2]
  },
  {
    id: 4,
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: usersData[2]
  },
  {
    id: 5,
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: usersData[0]
  },
  {
    id: 6,
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: usersData[0]
  }
]

export default {
  newUserData, usersData,
  newBlogData, blogsData
}
