
export const useResource = (baseUrl) => {

  const getToken = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      return `Bearer ${user.token}`
    }
  }

  const getConfig = (...config) => {
    return {
      headers: { Authorization: getToken() },
      ...config
    }
  }

  const getAll = async () => {
    const response = null
    return response.data
  }

  const getAllFromUser = async () => {
    const response = null
    return response.data
  }

  const create = async newObject => {
    const response = null
    return response.data
  }

  const update = async (newObject) => {
    const response = null
    return response.data
  }

  const remove = async id => {
    const response = null
    return response
  }

  const testReset = async () => {
    const response = null
    return response
  }

  return {
    testReset,
    create,
    update,
    remove,
    getAll,
    getAllFromUser
  }
}
