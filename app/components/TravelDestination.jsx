import React from 'react';

class TravelDestination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Travel Destination</h1>
        <h2>Departure City: {this.props.actions.getDepartureCity()}</h2>
        <button onClick={this.props.actions.setActiveComponent.bind(this, 'TravelOrigin')}>View TravelOrigin</button>
      </div>
    );
  }
}

export default TravelDestination;
