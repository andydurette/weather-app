import React from 'react';

export default class WeatherDisplay extends React.Component {

  render(){
    return(
      <section id="weatherDisplay">
        {this.props.weatherIcon}
        <div>
          <p>{this.props.day}</p>
          <p>{this.props.summary}</p>
          <p>High of {this.props.tempHigh}° | Low of {this.props.tempLow}°</p>
        </div>
      </section>
    )
  }
}