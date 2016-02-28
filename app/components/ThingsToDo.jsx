import React from 'react';
import request from 'superagent';
import { API_KEY } from '../../config.js';

class ActivityCard extends React.Component {
  render() {
    return (
      <div className="row">
        <img className="col-md-3" src={this.props.url} width="100" />
        <h6 className="col-md-6">{this.props.title}</h6>
        <h6 className="col-md-3">from: {this.props.fromPrice}</h6>
      </div>
    )
  }
}

class ThingsToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.destinationCity,
      startDate: this.props.actions.getDepartureDate(),
      endDate: this.props.actions.getReturnDate(),
      apiKey: API_KEY,
      activities: []
    }
  }

  getThingsToDo() {
    let component = this;
    return new Promise((resolve, reject) => {
      if (this.props.actions.getDestinationCity() != 'Destination City') {
        request.get("http://terminal2.expedia.com:80/x/activities/search?")
        .query({location: this.props.actions.getDestinationCity()})
        .query({startDate: this.props.actions.getDepartureDate()})
        .query({endDate: this.props.actions.getReturnDate()})
        .query({apikey: 'SuINAWM3vE20Wu3VIA34vOo4vwaAbAob'})
        .end(function(err, res){
          if (!res.body || !res.body.searchFailure){
            component.setState({
              activities: res.body.activities
            });
          } else {
            component.setState({
              activities: []
            });
          }
        });
      }
    });
  }

  componentWillReceiveProps() {
    this.getThingsToDo();
  }

  render() {
    let activityCards;
    if (this.state.activities.length) {
      activityCards = this.state.activities.map(function(activity){
        return (<ActivityCard key={activity.id} title={activity.title} url={activity.imageUrl} fromPrice={activity.fromPrice} />);
      });
    } else {
      activityCards = <div>Looks like there is not a whole lot going on...</div>
    }

    return (
       <div>
       <h2>Things To Do In {this.props.actions.getDestinationCity().split(',')[0]}</h2>
        {activityCards}
       </div>
    );
  }

}

export default ThingsToDo;
