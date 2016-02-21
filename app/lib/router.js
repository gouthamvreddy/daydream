import React from 'react';
import TravelDestination from '../components/TravelDestination.jsx';
import TravelOrigin from '../components/TravelOrigin.jsx';

// Handle Routing
let handleRoutes = (MainComponent, actions, route) => {
  switch (MainComponent.state.activeComponent) {
    case 'TravelOrigin':
    route.view = <TravelOrigin actions={actions} />;
    break;
    case 'TravelDestination':
    route.view = <TravelDestination actions={actions} />;
    break;
    default:
    route.view = <TravelOrigin actions={actions} />;
  }
}

export default handleRoutes;
