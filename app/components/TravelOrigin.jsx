import React from 'react';
import {DateRange} from 'react-date-range';

class TravelOrigin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setDepartureCity: (changeEvent) => {
        this.props.actions.setDepartureCity(changeEvent.target.value);
      },
      departureCity: this.props.actions.getDepartureCity(),
      setTravelDates: (dateRangeObj) => {
        this.props.actions.setDepartureDate(dateRangeObj.startDate._d.toISOString().slice(0,10));
        this.props.actions.setReturnDate(dateRangeObj.endDate._d.toISOString().slice(0,10));
        if (dateRangeObj.startDate._d != dateRangeObj.endDate._d)
          this.props.actions.setDateRangeObj(dateRangeObj);
      },
      destinationCity: this.props.actions.getDestinationCity(),
    };
  };
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.actions.setActiveComponent('TravelDestination');
  }
  render() {
    return (
      <div>
        <h1>Travel Origin</h1>
        <h2>Set Departure City and Travel Dates</h2>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <label htmlFor="departureCityInput">Flying from: </label>
          <input id='departureCityInput' placeholder={this.state.departureCity} onChange={this.state.setDepartureCity.bind(this)}></input><br></br>
          <input type="submit" value="Show Random Destination" />
          <DateRange
            calendars="1"
            init={this.state.setTravelDates}
            onChange={this.state.setTravelDates}
            width="100%"
            />
        </form>
        <h3>Departing from: {this.props.actions.getDepartureCity()}</h3>
        <h3>Departing on: {this.props.actions.getDepartureDate()}</h3>
        <h3>Returning on: {this.props.actions.getReturnDate()}</h3>
      </div>
    );
  }
}

export default TravelOrigin;
