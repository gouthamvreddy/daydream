'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TravelDestination from './components/TravelDestination.jsx'
// import TravelOrigin from './components/TravelOrigin.jsx'

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {toggle: true};
  }
  random() {
    this.setState({toggle: !this.state.toggle});
  }
  render() {
    let view;
    if(this.state.toggle === true) {
      view = "hello";
    } else {
      view = "goodbye";
    }

    return (
      <div>
        <div>Hello World!</div>
        <button onClick={this.random.bind(this)}>Click</button>
        {view}
      </div>
    )
  }
}


ReactDOM.render(<Main />, document.getElementById('app'));
