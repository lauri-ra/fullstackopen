import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const anecdoteToVote = action.payload
      const id = anecdoteToVote.id

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : anecdoteToVote  
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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    const foundAnecdote = anecdotes.find(a => a.id === id)
    const newObject = {...foundAnecdote, votes: foundAnecdote.votes + 1}
    
    const anecdote = await anecdoteService.vote(id, newObject)
    dispatch(vote(anecdote))
  }
}
 
export const { setAnecdotes, appendAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer