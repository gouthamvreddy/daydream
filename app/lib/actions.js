'use strict';

let actions = (MainComponent) => {
  return {
    setAppState: (obj) => {
      MainComponent.setState(obj);
    },
    getAppState: (obj) => {
      return MainComponent.state;
    },
    setActiveComponent: (componentName) => {
      MainComponent.setState({activeComponent: componentName});
    },
    getActiveComponent: () => {
      return MainComponent.state.activeComponent;
    },
    setDepartureCity: (dc) => {
      MainComponent.setState({departureCity: dc});
    },
    getDepartureCity: () => {
      return MainComponent.state.departureCity;
    },
    departureCityIsClarified: (bool) => {
      MainComponent.setState({departureCityIsClarified: bool})
    },
    setDepartureAirport: (da) => {
      MainComponent.setState({departureAirport: da});
    },
    getDepartureAirport: () => {
      return MainComponent.state.departureAirport;
    },
    setDepartureDate: (dd) => {
      MainComponent.setState({departureDate: dd});
    },
    getDepartureDate: () => {
      return MainComponent.state.departureDate;
    },
    setDestinationCity: (ac) => {
      MainComponent.setState({destinationCity: ac});
    },
    getDestinationCity: () => {
      return MainComponent.state.destinationCity;
    },
    setDestinationAirport: (da) => {
      MainComponent.setState({destinationAirport: da})
    },
    getDestinationAirport: () => {
      return MainComponent.state.destinationAirport;
    },
    setReturnDate: (rd) => {
      MainComponent.setState({returnDate: rd});
    },
    getReturnDate: () => {
      return MainComponent.state.returnDate;
    },
    setDateRangeObj: (dro) => {
      MainComponent.setState({dateRangeObj: dro});
    },
    getDateRangeObj: () => {
      return MainComponent.state.dateRangeObj;
    },
    setDestinationInfo: (destinationObj) => {
      MainComponent.setState({
        destinationAirport: destinationObj["airportCode"],
        destinationCity: destinationObj["cityName"],
        destinationImgUrl: destinationObj["imgUrl"],
        destinationImgAlt: destinationObj["imgDescription"],
        destinationInfo: destinationObj["cityDescription"]
      });
    },
    setFlightPrice: (fp) => {
      MainComponent.setState({flightPrice: fp})
    },
    getFlightPrice: () => {
      return MainComponent.state.flightPrice;
    }
  }
}

export default actions;
