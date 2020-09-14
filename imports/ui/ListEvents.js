import React, { Component } from 'react';
// import necessary files
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from "../api/events";
class ListEvents extends Component {
  render() {
    return (
      <div>
        {this.props.events.length ? this.props.events.map((event) => (
          <div className="list-group" key={event._id} style={{ margin: "20px 100px" }}>
            <div className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{event.title}</h5>
                <small>{event.date.toString()}</small>
              </div>
              <p className="mb-1">{event.description}</p>
            </div>
          </div>
        )) : <div className="no-events">OOOPSY: NO EVENTS REGISTERED</div>}
      </div>
    );
  }
}

// add `withTracker` HOC and pass in `ListEvents` and export the new component
export default withTracker(() => {
    return {
      events: Events.find({}). fetch()
    }
  })(ListEvents);