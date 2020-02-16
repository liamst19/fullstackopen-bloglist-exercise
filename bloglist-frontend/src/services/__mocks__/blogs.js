
const testBlogs = [
  {
    id: 'mock-id-1',
    title: 'mock blog one',
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
    title: 'mock blog two',
    author: 'mock two author',
    url: 'mock url two',
    likes: 2,
    user: {
      name: 'mock user two',
      id: 'mock-usr-id-2'
    }
  },
  {
    id: 'mock-id-3',
    title: 'mock blog three',
    author: 'mock three author',
    url: 'mock url three',
    likes: 2,
    user: {
      name: 'mock user three',
      id: 'mock-usr-id-3'
    }
  }
]

const testNewBlog = {
  id: 'mock-id-3',
  title: 'mock blog three',
  author: 'mock three author',
  url: 'mock url three',
  likes: 2,
  user: {
    name: 'mock user three',
    id: 'mock-usr-id-3'
  }
}

const getAllBlogs = () => {
  return Promise.resolve(testBlogs)
}

const createBlog = async newOject => {
  return Promise.resolve(testNewBlog)
}

const updateBlog = async (id, newObject) => {
  return Promise.resolve(testNewBlog)
}

const deleteBlog = async id => {
  return Promise.resolve(true)
}

export default {
//  setToken,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
}