const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'VOTE_NOTE':
      const noteID = action.data.id
      const noteToVote = state.find(n => n.id === noteID)
      const votedNote = {
        ...noteToVote,
        votes: noteToVote.votes + 1
      }
      return state.map(note =>
        note.id !== noteID ? note : votedNote
      )
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      votes: 0,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE_NOTE',
    data: { id }
  }
}

export default noteReducer