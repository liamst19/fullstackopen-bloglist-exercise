import axios from 'axios'

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
    const response = await axios.get(baseUrl)
    return response.data
  }

  const getAllFromUser = async () => {
    const response = await axios.get(baseUrl, getConfig())
    return response.data
  }

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, getConfig())
    return response.data
  }

  const update = async (newObject) => {
    const response = await axios.put(`${ baseUrl }/${newObject.id}`, newObject, getConfig())
    return response.data
  }

  const remove = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
    return response
  }

  const testReset = async () => {
    const response = await axios.post(`${baseUrl}/reset`)
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