import React from 'react';

export default class Modal extends React.Component {

  render(){
    let modal = (
      <div id="modal">
        <button id='modalCloseButton' onClick={this.props.onClose}>x</button>
        {this.props.weatherIcon}
        <p>{this.props.day}</p>
        <p>High of {this.props.tempHigh}°</p>
        <p>Low of {this.props.tempLow}°</p>
      </div>
    );

    if(!this.props.isOpen){
      modal = null;
    }
    return(
      <div>
        {modal}
      </div>
    )
  }
}