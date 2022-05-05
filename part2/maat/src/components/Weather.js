const Weather = ({ weather }) => {
    if(weather.length != 0) {
        const icon = weather.weather[0].icon
        const url = `http://openweathermap.org/img/wn/${icon}@2x.png`

        return (
            <div>
                <h3>Weather for {weather.name}</h3>
                <div>Temperature is {weather.main.temp} Ceclius</div>
                <img src={url}/>
                <div>Wind is {weather.wind.speed} m/s</div>
            </div>
        )
    }
}

export default Weather