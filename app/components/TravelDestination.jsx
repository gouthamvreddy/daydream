import React from 'react';
import request from 'superagent';
import destinationDataArray from '../lib/destinationData.js';
import ThingsToDo from './ThingsToDo.jsx'

class TravelDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationCity: '',
      flightPrice: '',
      appState: this.props.appState
    };
  }

  clarifySearchQuery() {
    return new Promise((resolve, reject) => {
      let departureCity = this.props.actions.getDepartureCity();
      let departureAirport = this.props.actions.getDepartureAirport();
      let data = {
        departureCity: departureCity,
        departureAirport: departureAirport
      }
      // If you have already clarified the search input, skip the ajax
      if (this.props.appState.departureCityIsClarified) {
        resolve(data);
      } else {
        // Default to Seattle if no input is given
        let cityQuery = (this.props.actions.getDepartureCity() === 'Departure City' ?
        'Seattle' : departureCity);
        request.get(`/api/suggestions_and_resolutions/${cityQuery}`)
        .end((err, res) => {
          // Reject the promise if error
          if (err) {
            this.executeCircleOfLife()
          } else {
            departureCity = JSON.parse(res.text).f.split(',').splice(0,2).join(", ");
            departureAirport = JSON.parse(res.text).a;
            console.log('Departure Airport: ' + departureAirport)
            console.log('Departure City: ' + departureCity)
            this.props.actions.setDepartureCity(departureCity);
            this.props.actions.setDepartureAirport(departureAirport);
            this.props.actions.departureCityIsClarified(true);
            // Resolve the promise
            data = {
              departureCity: departureCity,
              departureAirport: departureAirport
            }
            resolve(data);
          }
        })
      }
    });
  }

  pickRandomDestination(data) {
    return new Promise((resolve, reject) => {
      // Pick random destination from pre-selected options hard-coded
      // in lib/destinationData.js
      let getRandomDest = () => {
        return destinationDataArray[
          Math.floor(Math.random() * destinationDataArray.length - 1)
        ];
      }
      let destinationObj = getRandomDest();
      // Ensure that randomly chosen destination from the destinations
      // array has an airportCode - it should
      while (!destinationObj['airportCode']) {
        destinationObj = getRandomDest();
      }
      this.props.actions.setDestinationInfo(destinationObj);
      data.arrivalAirport = destinationObj['airportCode'];
      data.destinationCity = destinationObj['cityName'];
      this.setState({destinationCity: destinationObj['cityName']})
      resolve(data);
    })
  }

  fetchFlightInfo(data) {
    console.log(`Destination City: ${data.destinationCity}`);
    console.log(`Destination airport: ${data.arrivalAirport}`);
    return new Promise((resolve, reject) => {
      if (this.state.flightRequest) this.state.flightRequest.abort();
      let flightRequest = request.get(`/api/flight_search/`)
      .query({departureAirport: data.departureAirport})
      .query({arrivalAirport: data.arrivalAirport})
      .query({departureDate: this.props.actions.getDepartureDate()})
      .query({returnDate: this.props.actions.getReturnDate()})
      .end((err, res) => {
        if (!err) {
          data.res = res;
          resolve(data);
        }
        // else reject(alertError(err));
      });
      this.setState({flightRequest: flightRequest});
    })
    flightPromise.then((res) => {
      this.updateOnResponse(res);
    })
  }

  updateOnResponse(data) {
    let resObj = JSON.parse(data.res.text);
      // If there is no available flight given the input, the compenent
      // is re-rendered to search for new options
      if (!resObj.offers || !resObj.offers[0] || !resObj.offers[0].totalFare) {
        this.executeCircleOfLife();
      } else {
        let cheapestFlight = resObj.offers[0];
        // Add more functionality
        this.props.actions.setFlightPrice(cheapestFlight.totalFare);
        this.setState({
          flightPrice: cheapestFlight.totalFare,
          detailsUrl: cheapestFlight.detailsUrl.toString()
        });
      }
  }

  executeCircleOfLife() {
    this.clarifySearchQuery()
      .then(this.pickRandomDestination.bind(this))
      .then(this.fetchFlightInfo.bind(this))
      .then(this.updateOnResponse.bind(this));
  }

  alertError(err) {
    alert('There was a problem finding a destination...')
  }

  componentDidMount() {
    this.executeCircleOfLife();
  };

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({flightPrice: ''});
    this.executeCircleOfLife();
  };

  render() {
    let flightPrice = `\$${this.props.actions.getFlightPrice()}`;
    return (
      <div>
        <h2>Departure City: {this.props.actions.getDepartureCity()}</h2>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <label htmlFor="pickRandomDestination"></label>
          <input type="submit" value="New Random Destination" />
        </form>
        {this.props.actions.getDestinationCity() === 'Destination City' ?
          <h2>Getting Random Destination...</h2> :
          <h2>Random Destination: {this.props.actions.getDestinationCity()}</h2>
        }
        {this.state.flightPrice ?
          <div>
            <h3><a href={this.state.detailsUrl} target="_blank">Book Now for {flightPrice}</a></h3>
          </div> :
          <h3>Getting the cheapest flight...</h3>
        }
        <ThingsToDo
          actions={this.props.actions}
          appState={this.state.appState}
          destinationCity={this.state.destinationCity}
        />

      </div>
    );
  }
}

export default TravelDestination;
