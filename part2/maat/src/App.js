import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const[allCountries, setAllCountries] = useState([])
  const[countryList, setCountryList] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase()

    const found = allCountries.filter(
      country => country.name.common.toLowerCase().includes(search)
    )

    setCountryList(found)
  }

  return (
    <div>
      <h2>Country Information</h2>

      <form>
        <div>
          Find countries: <input onChange={handleSearch}/>
        </div>
      </form>

      <CountryList countries={countryList}/>

    </div>
  )
}

export default App;
