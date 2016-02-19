import React from 'react';

class TravelDestination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Travel Destination</h1>
        <button onClick={this.props.controllers.changeView.bind(this, 'TravelOrigin')}>View TravelOrigin</button>
      </div>
    );
  }
}

export default TravelDestination;
