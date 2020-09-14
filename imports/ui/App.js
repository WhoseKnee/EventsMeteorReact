import React, { Component } from 'react';
import AddEvent from './AddEvent';
// Add ListEvents
import ListEvents from './ListEvents';

// Create a new React Component `EventApp`
class EventApp extends Component {
  render() {
    return (
      <div>
        <AddEvent />
        
        {//<pre>DB Stuff: {JSON.stringify(this.props, null, ' ')} </pre>
        }
        <ListEvents {...this.props}/>
      </div>
    );
  }
}

// export the component `App`
export default EventApp;