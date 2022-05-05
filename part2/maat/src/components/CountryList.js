const Country = ({ country }) => {
    const languages = Object.values(country.languages)

    return (
        <div>
            <h1>{country.name.common}</h1>

            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>

            <h3>Languages</h3>
            <ul>
                {languages.map(language =>
                    <li key={language}> {language} </li>
                )}
            </ul>

            <div>
                <img src={country.flags['png']} />
            </div>
        </div>
    )
}

const CountryList = ({ countries, handleClick }) => {
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
                <div key={country.name.common}> {country.name.common} 
                    <button value={country.name.common} onClick={handleClick}>
                        Show
                    </button>
                </div>
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