const Person = ({ person }) => {
    return (
      <p>{person.name} {person.number}</p>
    )
  }

const Persons = ({filtered}) => {
    return (
      <div>
        {filtered?.map(person => 
          <Person key={person.name} person={person}/>
        )}
      </div>
    )
}

export default Persons