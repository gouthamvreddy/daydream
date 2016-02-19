'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TravelDestination from './components/TravelDestination.jsx';
import TravelOrigin from './components/TravelOrigin.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    // Maintain state (data store) for the entire app; Simple alternative to Redux
    this.state = {
      activeComponent: 'TravelOrigin',
      departureCity: '',
    };
  }

  render() {
    // Actions - This actions object contains all of the functionality for
    // getting and retrieving state data for the app
    const actions = {
      setActiveComponent: (componentName) => {
        this.setState({activeComponent: componentName});
      },
      getActiveComponent: () => {
        return this.state.activeComponent;
      },
      setDepartureCity: (dc) => {
        this.setState({departureCity: dc});
      },
      getDepartureCity: () => {
        return this.state.departureCity;
      }
    }

    // Handle Routing
    const router = {view: ''};
    switch (this.state.activeComponent) {
      case 'TravelOrigin':
      router.view = <TravelOrigin actions={actions} />;
      break;
      case 'TravelDestination':
      router.view = <TravelDestination actions={actions} />;
      break;
      default:
      router.view = <TravelOrigin actions={actions} />;
    }

    // Render the App
    return (
      <div>
        <div>DayDream</div>
        {/* Below, unless we are on the starting page,
           we show a "start over" button.  */}
        {this.state.activeComponent !== 'TravelOrigin' ?
          (<button onClick={actions.setActiveComponent.bind(this, 'TravelOrigin')}>Start Over</button>) : null}
        {router.view}
      </div>
    )
  }
};

ReactDOM.render(<Main />, document.getElementById('app'));
