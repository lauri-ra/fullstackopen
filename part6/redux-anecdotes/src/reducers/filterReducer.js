import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            state = action.payload
            console.log('search for', state)
            return state
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer