const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>

            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>

            <h3>Languages</h3>
        </div>
    )
}

const CountryList = ({ countries }) => {

    const length = countries.length
    
    if(length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if(length > 1 && length < 10) {
        return (
            <div>
              {countries.map(country => 
                <div key={country.name.common}> {country.name.common} </div>
              )}
            </div>
          )
    }
    else if(length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    }

}

export default CountryList