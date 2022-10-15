import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeout = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload

      if (state.timeout) {
        clearTimeout(state.timeout)
      }

      return state.message
    },
    removeNotification(state, aciton) {
      return initialState
    }
  }
})

export const createNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification({ message, timeout }))

    timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
