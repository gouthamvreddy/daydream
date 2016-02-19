'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TravelDestination from './components/TravelDestination.jsx';
import TravelOrigin from './components/TravelOrigin.jsx';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeComponent: 'TravelOrigin'
    };
  }
  render() {
    const controllers = {
      changeView: (componentName) => {
        this.setState({activeComponent: componentName});
      }
    }

    // Handle Routing
    const router = {view: ''};
    switch (this.state.activeComponent) {
      case 'TravelOrigin':
        router.view = <TravelOrigin controllers={controllers} />;
        break;
      case 'TravelDestination':
        router.view = <TravelDestination controllers={controllers} />;
        break;
      default:
        router.view = <TravelOrigin controllers={controllers} />;
    }

    return (
      <div>
        <div>Hello World!</div>
        <button onClick={controllers.changeView.bind(this, 'TravelOrigin')}>Home</button>
        {router.view}
      </div>
    )
  }
}


ReactDOM.render(<Main />, document.getElementById('app'));
