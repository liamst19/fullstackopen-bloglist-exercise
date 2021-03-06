
export const newBlogData = user => {
  return {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    url: 'https://www.gutenberg.org/files/2554/2554-h/2554-h.htm',
    likes: 65,
    user: user
  }
}

export const blogsData = user => {
  return [
    {
      id: 1,
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: user
    },
    {
      id: 2,
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: user
    },
    {
      id: 3,
      title: 'canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: user
    },
    {
      id: 4,
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: user
    },
    {
      id: 5,
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      user: user
    },
    {
      id: 6,
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: user
    }
  ]
}
