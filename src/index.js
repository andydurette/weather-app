import React from 'react';
import ReactDOM from 'react-dom';
import WeatherTiles from './WeatherTiles';
import WeatherDisplay from './WeatherDisplay';
import './index.scss';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      weather: {},
      isFetching: true,
      isOpenValue: 0,
      isActive: 0,
      menuActive: false
    }

    // Actual Url: https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7e2a14caaf233206e9baa745d4d549c1/43.6532,-79.3832
    // Testing Url: https://cors-anywhere.herokuapp.com/http://andydurette.com/sitelog/test-data/weather.json

    fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7e2a14caaf233206e9baa745d4d549c1/43.6532,-79.3832')
     .then((res) => res.json())
     .then((data) => this.setState({weather: data}))
     .then(() => this.setState({ isFetching: false}))
  }

  // Function that calls date information to display with weather Api Data
  dateset = (i) =>{
    var date = new Date();
    date.setDate(date.getDate() + i);
    return date.toString().substring(0,3);
    }

  // Function that returns a formated date string with the key number represented by i for the day 
  datesetFull = (i) =>{
    var date = new Date();
    date.setDate(date.getDate() + i);
    return date.toString().slice(0,15) + ' ' +  date.toString().substring(33);
    }
  
  // Compares the api text for weather to use an image, tried using a switch operator instead of if but had errors
  weatherIcon = (i) => {
    const icon = this.state.weather.daily.data[i].icon;

    if( icon === "clear-day" ) {
      return <img src="/images/day-clear.svg" alt='Clear Day' />
    }else if (icon === "partly-cloudy-day"){
      return <img src="/images/day-partly-cloudy.svg" alt='Partly Cloudy Day'/>
    }else if( icon === "clear-night" ) {
      return <img src="/images/day-clear.svg" alt='Clear Night'/>
    }else if (icon === "partly-cloudy-night"){
      return <img src="/images/day-partly-cloudy.svg" alt='Partly Cloudy Night'/>
    }else if (icon === "cloudy"){
      return <img src="/images/day-cloudy.svg" alt='Cloudy' />
    }else if (icon === "rain"){
      return <img src="/images/day-rain.svg" alt='Rain' />
    }else if (icon === "sleet"){
      return <img src="/images/day-sleet.svg" alt='Sleet' />
    }else if (icon === "snow"){
      return <img src="/images/day-snow.svg" alt='Snow' />
    }else if (icon === "wind"){
      return <img src="/images/day-wind.svg" alt='Wind' />
    }else if (icon === "fog"){ 
      return <img src="/images/day-fog.svg" alt='Fog' />
    }
  }

  // Takes temperature from api data based off the day using i and converts it for Canadian reporting.
  tempHigh = (i) => {
    return Math.round((this.state.weather.daily.data[i].temperatureHigh-32)/1.8);
  }

  // Takes temperature from api data based off the day using i and converts it for Canadian reporting.
  tempLow = (i) => {
    return Math.round((this.state.weather.daily.data[i].temperatureLow-32)/1.8);
  }

  // Takes summary from api data based off the day using i and reports.
  summary = (i) => {
    return this.state.weather.daily.data[i].summary;
  }

  // Changes state to update weather mobile menu should appear
  menuUpdate = () => {
    if (this.state.menuActive === false ){
      this.setState({ menuActive: true})
    }else{
      this.setState({ menuActive: false});
    }
  }

  render() {
    return (
      <React.Fragment>
          {this.state.isFetching ?  
          <div id="loadingScreen">
          <p>Loading...</p>
          </div>
          : (
            <React.Fragment>
            <h1>Toronto Weekly Weather Forecast</h1>
            {/* Displays main content, the larger section about weather based on the day*/}
            <WeatherDisplay
              day={this.datesetFull(this.state.isOpenValue)}
              weatherIcon={this.weatherIcon(this.state.isOpenValue)}
              tempHigh={this.tempHigh(this.state.isOpenValue)}
              tempLow={this.tempLow(this.state.isOpenValue)} 
              summary={this.summary(this.state.isOpenValue)}
            ></WeatherDisplay>

            {/* Controls for weather display */}
            <section id='weatherContainer' className={(this.state.menuActive === false ) ? "close" : ""}>
              {
            [0,1,2,3,4,5,6].map ( (n) => {
                return (
                  <WeatherTiles
                    key={n} 
                    day={this.dateset(n)} 
                    weatherIcon={this.weatherIcon(n)} 
                    tempHigh={this.tempHigh(n)} 
                    tempLow={this.tempLow(n)} 
                    onClick={(e) => this.setState({ isOpenValue: Number(n), isActive: Number(n), menuActive: false})}
                    className={(n === this.state.isActive ) ? "weatherTiles active" : "weatherTiles"}
                  />
                )
            })
        }         
            </section>
            {/* Api link included based off terms of aggrement */}
            <footer>
              <a href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Application data provided by Dark Sky</a>
            </footer>

            {/* Mobile Menu control*/}
            <div className="mobilemenu" onClick={ () => this.menuUpdate() } ><p>Day Menu</p></div>
            </React.Fragment>
          )}
        </React.Fragment>
    );
  }
}

// Render to index.html

ReactDOM.render(
  <App />,
  document.getElementById('root')
);