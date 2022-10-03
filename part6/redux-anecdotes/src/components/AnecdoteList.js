import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

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

    const getAnecdotes = useSelector(state => state.anecdotes)
    const anecdoteList = [...getAnecdotes]

    const sortedAnecdotes = anecdoteList.sort( (a,b) => {
        return b.votes - a.votes
    })

    const search = useSelector(state => state.filter)
    const anecdotes = sortedAnecdotes.filter(
      anecdote => anecdote.content.toLowerCase().includes(search)
    )

    const handleVote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(createNotification(`You voted for ${anecdote.content}`, 5))
    }

    return (
        <div>
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