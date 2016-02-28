import React from 'react';
import TravelDestination from '../components/TravelDestination.jsx';
import TravelOrigin from '../components/TravelOrigin.jsx';

// Handle Routing
let handleRoutes = (MainComponent, actions, route, state) => {
  switch (MainComponent.state.activeComponent) {
    case 'TravelOrigin':
    route.view = <TravelOrigin actions={actions} appState={state}/>;
    break;
    case 'TravelDestination':
    route.view = <TravelDestination actions={actions} appState={state}/>;
    break;
    default:
    route.view = <TravelOrigin actions={actions} appState={state}/>;
  }
}

export default handleRoutes;
