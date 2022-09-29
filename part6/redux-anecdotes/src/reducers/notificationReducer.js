import { createSlice } from '@reduxjs/toolkit'

const initialState = 'important notification'

const notificationSlice = createSlice({
    name: 'notis',
    initialState,
    reducers: {
        createNotification(state, action) {
            const message = action.payload
            state.push({ message })
        }
    }
})

export default notificationSlice.reducer