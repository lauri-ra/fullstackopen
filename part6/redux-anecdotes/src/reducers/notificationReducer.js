import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
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

export const createNotification = (messgae, time) => {
    return dispatch => {
        dispatch(setNotification(messgae))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer