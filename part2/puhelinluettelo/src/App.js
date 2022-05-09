import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(persons => {
        setPersons(persons)
        setFiltered(persons)
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
      PersonService
        .create(nameObject)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          setFiltered(filtered.concat(returnedObj))
        })
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

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      PersonService
        .remove(person.id)
        .then(response => {
          PersonService
          .getAll()
          .then(persons => {
            setPersons(persons)
            setFiltered(persons)
          })
        })
    }
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
      <Persons persons={filtered} handleDelete={handleDelete}/>
    </div>
  )

}

export default App
