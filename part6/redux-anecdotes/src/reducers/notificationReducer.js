import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        createNotification(state, action) {
            const message = action.payload
            state = message
            return state
        },
        removeNotification(state, action) {
            state = initialState
            return state
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer