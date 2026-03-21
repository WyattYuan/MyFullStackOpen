import { use, useState } from 'react'

const PersonList = ({ persons }) => {
  return <>
    {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
  </>
}


const Filter = ({
  nameToSearch,
  setNameToSearch,
  onSubmit
}) => {
  return (
    <div>
      filter shown with
      <form onSubmit={onSubmit}>
        <input value={nameToSearch} onChange={(event) => setNameToSearch(event.target.value)} />
      </form>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')

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

  const handleSearch = (event) => {
    event.preventDefault()
    setPersonsToShow(persons.filter((person) => person.name.match(nameToSearch)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameToSearch={nameToSearch} setNameToSearch={setNameToSearch} onSubmit={handleSearch}></Filter>
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={setNewName} newNumber={newNumber} onNumberChange={setNewNumber} onSubmit={handleAddPerson}></PersonForm>
      <h2>Numbers</h2>
      <PersonList persons={personsToShow}></PersonList>
    </div>
  )
}

export default App