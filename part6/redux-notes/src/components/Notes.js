import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf, vote } from '../reducers/noteReducer'

const Note = ({ note, handleClick, handleVote }) => {
  return(
    <div>
      <li onClick={handleClick}>
        {note.content} 
        <strong> {note.important ? 'important' : ''}</strong>
      </li>
      <div>
        has {note.votes} votes
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
          handleVote={() =>
            dispatch(vote(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes