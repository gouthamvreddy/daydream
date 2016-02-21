'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ACTIONS from './lib/actions.js';
import DATA_STORE from './lib/store.js';
import ROUTER from './lib/router.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    // Maintain state (data store) for the entire app; Simple alternative to Redux
    this.state = DATA_STORE;
  }

  render() {
    // ACTIONS - contains functionality for getting and retrieving state data
    const actions = ACTIONS(this);

    // Handle Routing
    const route = {};
    // Instantiate ROUTER with actions and route object
    ROUTER(this, actions, route);

    // Render the App
    return (
      <div>
        <div>DayDream</div>
        {/* Below, unless we are on the starting page,
           we show a "start over" button.  */}
        {this.state.activeComponent !== 'TravelOrigin' ?
          (<button onClick={actions.setActiveComponent.bind(this, 'TravelOrigin')}>Start Over</button>) : null}
        {route.view}
      </div>
    )
  }
};

ReactDOM.render(<Main />, document.getElementById('app'));
