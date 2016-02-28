import destinationDataArray from '../lib/destinationData.js';

const appDataStore = {
  activeComponent: 'TravelOrigin',
  departureCity: 'Departure City',
  departureCityIsClarified: false,
  departureAirport: 'SEA',
  departureDate: (new Date()).toISOString().split('T')[0], //Default to today
  destinationCity: 'Destination City',
  destinationAirport: 'SFO',
  destinationData: destinationDataArray,
  destinationImgUrl: '',
  destinationImgAlt: '',
  destinationInfo: '',
  returnDate: (new Date()).toISOString().split('T')[0], //Default to today
  dateRangeObj: {},
  flightRequest: {},
  flightPrice: ''
}

export default appDataStore
