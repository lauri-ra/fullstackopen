import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Person'
import PersonService from './services/PersonService'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [errorStatus, setError] = useState(false)

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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = found.id

        PersonService
          .replace(id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setFiltered(filtered.map(person => person.id !== id ? person : returnedPerson))

            setMessage(`Replaced the number for ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
    else {
      PersonService
        .create(nameObject)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj))
          setFiltered(filtered.concat(returnedObj))

          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setError(true)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setError(false)
            setMessage(null)
          }, 5000)
        }
        )
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

            setMessage(`Removed ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} errorStatus={errorStatus}/>

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
