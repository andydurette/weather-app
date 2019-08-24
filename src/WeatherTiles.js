import React from 'react';

export default class WeatherTiles extends React.Component {

render() {
  return (
      <div className={this.props.className} onClick={this.props.onClick}>
        <p>{this.props.weatherIcon}</p>
        <p>{this.props.day}</p>
        <p>{this.props.tempHigh}° | {this.props.tempLow}°</p>
      </div>
  )
}
}


