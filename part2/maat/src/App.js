import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Weather from './components/Weather'

const App = () => {
  const[allCountries, setAllCountries] = useState([])
  const[countryList, setCountryList] = useState([])
  const[weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const getWeather = (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const key = process.env.REACT_APP_API_KEY
    const url = `${baseURL}?q=${city}&appid=${key}&units=metric`

    axios
      .get(url)
      .then(response =>
        setWeather(response.data)
      )
  }

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase()

    const found = allCountries.filter(
      country => country.name.common.toLowerCase().includes(search)
    )

    setCountryList(found)
    
    if(found.length === 1) {
      getWeather(found[0].capital[0])
    }
    else{
      setWeather([])
    }
  }

  return (
    <div>
      <h2>Country Information</h2>

      <form>
        <div>
          Find countries: <input onChange={handleSearch}/>
        </div>
      </form>

      <CountryList countries={countryList} handleClick={handleSearch}/>

      <Weather weather={weather}/>

    </div>
  )
}

export default App;
