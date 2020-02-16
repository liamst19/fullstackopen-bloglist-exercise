import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store