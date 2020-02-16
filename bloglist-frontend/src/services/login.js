import axios from 'axios'

const baseUrl = '/api/login'
const LOCAL_STORAGE_KEY = 'loggedBlogListUser'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  if(response.status === 200 && response.data){
    setUser(response.data)
  }
  return response.data
}

const logout = () => {
  window.localStorage.clear()
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    return user
  }
  return null
}

const setUser = user => {
  if(user){
    console.log('setting user')
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
  }
}

export default { LOCAL_STORAGE_KEY, login, logout, getUser, setUser }