import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect run')

    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

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
