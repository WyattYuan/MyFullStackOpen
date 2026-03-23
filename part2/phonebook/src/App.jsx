import axios from 'axios'
import { useEffect, useState } from 'react'

const PersonList = ({ persons }) => {
  return <>
    {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
  </>
}


const Filter = ({
  nameToSearch,
  setNameToSearch
}) => {
  return (
    <div>
      filter shown with

      <input value={nameToSearch} onChange={(event) => setNameToSearch(event.target.value)} />

    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => onNameChange(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => onNumberChange(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')

  useEffect(
    () => {
      axios.get('http://localhost:3001/persons').then(response => setPersons(response.data))
    }
    , [])

  const personsToShow = nameToSearch === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(nameToSearch.toLowerCase()))


  const handleAddPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameToSearch={nameToSearch} setNameToSearch={setNameToSearch}></Filter>
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={setNewName} newNumber={newNumber} onNumberChange={setNewNumber} onSubmit={handleAddPerson}></PersonForm>
      <h2>Numbers</h2>
      <PersonList persons={personsToShow}></PersonList>
    </div>
  )
}

export default App