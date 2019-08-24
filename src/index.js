import React from 'react';
import ReactDOM from 'react-dom';
import WeatherTiles from './WeatherTiles';
import WeatherDisplay from './WeatherDisplay';
import './index.css';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      weather: {},
      isFetching: true,
      isOpenValue: 0,
      isActive: 0
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7e2a14caaf233206e9baa745d4d549c1/43.6532,-79.3832')
     .then((res) => res.json())
     .then((data) => this.setState({weather: data}))
     .then(() => this.setState({ isFetching: false}))
     .then(() => {} )
  }

  dateset = (i) =>{
    var date = new Date();
    date.setDate(date.getDate() + i);
    return date.toString().substring(0,3);
    }

  datesetFull = (i) =>{
    var date = new Date();
    date.setDate(date.getDate() + i);
    return date.toString().slice(0,15) + ' ' +  date.toString().substring(33);
    }
  
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

  tempHigh = (i) => {
    return Math.round((this.state.weather.daily.data[i].temperatureHigh-32)/1.8);
  }

  tempLow = (i) => {
    return Math.round((this.state.weather.daily.data[i].temperatureLow-32)/1.8);
  }

  summary = (i) => {
    return this.state.weather.daily.data[i].summary;
  }

  render() {
    return (
        <div className="background">
          {this.state.isFetching ?  
          <div id="loadingScreen">
          <p>Loading...</p>
          </div>
          : (
            <React.Fragment>
            <h1>Toronto Weekly Weather Forecast</h1>
            <WeatherDisplay
              day={this.datesetFull(this.state.isOpenValue)}
              weatherIcon={this.weatherIcon(this.state.isOpenValue)}
              tempHigh={this.tempHigh(this.state.isOpenValue)}
              tempLow={this.tempLow(this.state.isOpenValue)} 
              summary={this.summary(this.state.isOpenValue)}
            ></WeatherDisplay>
            <section id='weatherContainer'>
              {
            [0,1,2,3,4,5,6].map ( (n) => {
                return (
                  <WeatherTiles
                    key={n} 
                    day={this.dateset(n)} 
                    weatherIcon={this.weatherIcon(n)} 
                    tempHigh={this.tempHigh(n)} 
                    tempLow={this.tempLow(n)} 
                    onClick={(e) => this.setState({ isOpenValue: Number(n), isActive: Number(n)})}
                    className={(n === this.state.isActive ) ? "weatherTiles active" : "weatherTiles"} 
                  />
                )
            })
        }         
            </section>
            <footer>
              <a href="https://darksky.net/poweredby/" target="_blank" rel="noopener noreferrer">Application data provided by Dark Sky</a>
            </footer>
            </React.Fragment>
          )}
        </div>
    );
  }
}

// Render to index.html

ReactDOM.render(
  <App />,
  document.getElementById('root')
);