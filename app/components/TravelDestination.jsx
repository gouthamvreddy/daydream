import React from 'react';
import request from 'superagent';
import destinationDataArray from '../lib/destinationData.js';

class TravelDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setDestinationInfo: this.props.actions.setDestinationInfo
    };
  }

  clarifySearchQuery() {
    return new Promise((resolve, reject) => {
      // Default to Seattle if no input is given
      let cityQuery = (this.props.actions.getDepartureCity() != 'Departure City' ?
      this.props.actions.getDepartureCity() :
      'Seattle');
      request.get(`/api/suggestions_and_resolutions/${cityQuery}`)
      .end((err, res) => {
        // Reject the promise if error
        if (err) {
          this.executeCircleOfLife()
        } else {
          let departureCity = JSON.parse(res.text).f.split(',').splice(0,2).join(", ");
          let departureAirport = JSON.parse(res.text).a;
          console.log('airpoort ' + departureAirport)
          this.props.actions.setDepartureCity(departureCity);
          this.props.actions.setDepartureAirport(departureAirport);
          // Resolve the promise
          let data = {
            departureCity: departureCity,
            departureAirport: departureAirport
          }
          resolve(data);
        }
      });
    })
  }

  pickRandomDestination(data) {
    return new Promise((resolve, reject) => {
      let destinationObj = destinationDataArray[
        Math.floor(Math.random() * destinationDataArray.length - 1)
      ];
      this.state.setDestinationInfo(destinationObj);
      if (destinationObj['airportCode']) {
        data.arrivalAirport = destinationObj['airportCode'];
        console.log('departure airport: ' + data.departureAirport);
        resolve(data);
      } else {
        reject()
      }
    })
  }

  fetchFlightInfo(data) {
    console.log('random destination airport: ' + data.arrivalAirport);
    let flightPromise = new Promise((resolve, reject) => {
      if (this.state.flightRequest) this.state.flightRequest.abort();
      let flightRequest = request.get(`/api/flight_search/`)
      .query({departureAirport: data.departureAirport})
      .query({arrivalAirport: data.arrivalAirport})
      .query({departureDate: this.props.actions.getDepartureDate()})
      .query({returnDate: this.props.actions.getReturnDate()})
      .end((err, res) => {
        if (!err) resolve(res);
        // else reject(alertError(err));
      });
      this.setState({flightRequest: flightRequest});
    });
    flightPromise.then((res) => {
      this.updateOnResponse(res);
    })
  }

  updateOnResponse(res) {
    let resObj = JSON.parse(res.text);
      // If there is no available flight given the input, the compenent
      // is re-rendered to search for new options
      if (!resObj.offers || !resObj.offers[0] || !resObj.offers[0].totalFare) {
        this.executeCircleOfLife();
      } else {
        let cheapestFlight = resObj.offers[0];
        console.log(cheapestFlight);
        this.setState({
          price: cheapestFlight.totalFare,
          detailsUrl: cheapestFlight.detailsUrl
        });
      }
  }

  executeCircleOfLife() {
    // this.clarifySearchQuery().then(
    //   this.pickRandomDestination().then(
    //     this.fetchFlightInfo()
    //   )
    // )
    this.clarifySearchQuery().then(this.pickRandomDestination.bind(this)).then(this.fetchFlightInfo.bind(this));
    // this.pickRandomDestination().then(this.clarifySearchQuery).then(this.fetchFlightInfo)
  }

  alertError(err) {
    alert('There was a problem finding a destination...')
  }

  componentDidMount() {
    this.executeCircleOfLife();
  };

  handleFormSubmit(event) {
    event.preventDefault();
    this.executeCircleOfLife();
  };

  render() {
    return (
      <div>
        <h1>Travel Destination</h1>
        <h2>Departure City: {this.props.actions.getDepartureCity()}</h2>
        <h2>Random Destination: {this.props.actions.getDestinationCity()}</h2>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <label htmlFor="pickRandomDestination">Click for a new destination</label>
          <input type="submit" value="New Destination" />
        </form>
      </div>
    );
  }
}

export default TravelDestination;
