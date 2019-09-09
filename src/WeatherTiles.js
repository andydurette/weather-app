import React from 'react';

export default class WeatherTiles extends React.Component {

render() {
  return (
      <button role="button" className={this.props.className} onClick={this.props.onClick}>
        <p>{this.props.day}<span className="screen-reader-only">{this.props.datesetEnd}</span></p>
        <p>{this.props.weatherIcon}</p>
        <p><span className="screen-reader-only">High of </span>{this.props.tempHigh}° | <span className="screen-reader-only">Low of </span>{this.props.tempLow}°</p>
      </button>
  )
}
}


