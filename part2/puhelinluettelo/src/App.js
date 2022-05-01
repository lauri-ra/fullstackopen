import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => (nameObject.name === person.name))

    if(found) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setFiltered(filtered.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const search = event.target.value.toLowerCase()

    const filter = persons.filter(
      person => person.name.toLowerCase().includes(search)
    )
    setFiltered(filter)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter}/>

      <h2>Add new person</h2>
      <Form 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons person={persons} filtered={filtered}/>
    </div>
  )

}

export default App
