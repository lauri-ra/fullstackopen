import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return action.payload
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)

      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote  
      )
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
 
export const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer