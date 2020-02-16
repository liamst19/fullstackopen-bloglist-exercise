import deepFreeze from 'deep-freeze'
import blogReducer, { actionType } from './blogreducer'
import { blogsData, newBlogData } from '../tests/blog_test_blogs_data'

describe('blog reducer', () => {
  beforeEach(async () => {
  })

  test('undefined state returns empty array', () => {
    const action = { type: 'DO_NOTHING' }
    const newState = blogReducer(undefined, action)
    expect(newState).not.toBeUndefined()
  })

  test('initialize state', async () => {
    const blogs = blogsData({ id: '1' })
    const action = {
      type: actionType.READ_ALL,
      data: blogs
    }
    const state = []
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toBe(blogs)
  })

  test('add new blog', () => {
    const action = {
      type: actionType.CREATE,
      content: newBlogData({ id: '1' })
    }
    const state = blogsData({ id: '1' })
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toContainEqual(action.content)
  })

  test('update blog', () => {
    const updatingLikes = 9999
    const initBlogs = blogsData({ id: '1' })
    const originalLikes = initBlogs[0].likes
    const action = {
      type: actionType.UPDATE,
      content: {
        ...initBlogs[0],
        likes: updatingLikes
      }
    }
    const state = initBlogs
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState[0].likes).not.toBe(originalLikes)
    expect(newState[0].likes).toBe(updatingLikes)
  })

  test('delete blog', () => {
    const initBlogs = blogsData({ id: '1' }).map((blog, i) => { return { ...blog, id: i }})
    const delId = initBlogs[0].id
    const initCount = initBlogs.length
    const action = {
      type: actionType.DELETE,
      id: delId
    }
    const state = initBlogs
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.length).toBe(initCount - 1)
    expect(newState).not.toContainEqual(initBlogs[0])
  })
})