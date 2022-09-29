import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => 
      state.anecdotes.sort( (a,b) => {
        return b.votes - a.votes
      })
    )

    const handleVote = (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(createNotification(`You voted for ${anecdote.content}`))

      setTimeout(() => {
        dispatch(removeNotification())
      }, '5000')
    }

    return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => handleVote(anecdote)}
            />
          )}
        </div>
      )
}

export default Anecdotes