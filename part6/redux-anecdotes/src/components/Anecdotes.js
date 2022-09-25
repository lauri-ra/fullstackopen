import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)

    return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(vote(anecdote.id))}
            />
          )}
          <h2>create new</h2>
          <form>
            <div><input /></div>
            <button>create</button>
          </form>
        </div>
      )
}

export default Anecdotes