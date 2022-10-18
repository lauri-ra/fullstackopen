import { createSlice } from '@reduxjs/toolkit'
import { createNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    }
  }
})

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setLogin(user))
    } catch {
      dispatch(createNotification('Incorrect credentials', 5))
    }
  }
}

export const logUserOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
    dispatch(setLogin(null))
  }
}

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer
