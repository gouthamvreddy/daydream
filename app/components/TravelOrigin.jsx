import React from 'react';

class TravelOrigin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setDepartureCity: (clickEvent) => {
        this.props.actions.setDepartureCity(clickEvent.target.value);
      }
    }
  }
  setPlaceholderText() {
    // If the departure city has not already been defined, set the placeholder
    // text to "Departure City"
    return this.props.actions.getDepartureCity() ?
      this.props.actions.getDepartureCity() :
      "Departure City"
  };
  render() {
    return (
      <div>
        <h1>Travel Origin</h1>
        <h2>Set Departure City and Travel Dates</h2>
        <input placeholder={this.setPlaceholderText()} onChange={this.state.setDepartureCity.bind(this)}></input><br></br>
        <button onClick={this.props.actions.setActiveComponent.bind(this, 'TravelDestination')}>
          Show Random Destination
        </button>

      </div>
    );
  }
}

export default TravelOrigin;
