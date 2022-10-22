import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer
  }
})

console.log('store state', store.getState())

export default store
