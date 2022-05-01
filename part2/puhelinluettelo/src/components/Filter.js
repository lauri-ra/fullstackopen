const Filter = ({handleFilter}) => {
    return (
        <form>
          <div>
            Filter phonebook: <input
            onChange={handleFilter}/>
          </div>
        </form>
    )
}

export default Filter