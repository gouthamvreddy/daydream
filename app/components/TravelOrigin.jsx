import React from 'react';

class TravelOrigin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Travel Origin</h1>
        <button onClick={this.props.random}>View TravelDestination</button>
      </div>
    );
  }
}

export default TravelOrigin;
