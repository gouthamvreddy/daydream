'use strict';

let actions = (MainComponent) => {
  return {
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
    }
  }
}

export default actions;
