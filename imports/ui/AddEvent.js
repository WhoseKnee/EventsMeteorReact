import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import {addEvent} from'/server/main.js';
class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: ""
    }
  }

  handleChange = (event) => {
    const field = event.target.name;

    // we use square braces around the key `field` coz its a variable (we are setting state with a dynamic key name)
    // for example: set title to whatever that has been changed
    this.setState({
      [field]: event.target.value
    })
  }

  handleSubmit = (event) => {
    // prevents page from refreshing onSubmit
    event.preventDefault();

    const oneEvent  = { title : this.state.title, 
                      description : this.state.description, 
                      date : this.state.date
                    };
    
    // TODO: Create backend Meteor methods to save created events
    // alert("Will be Saved in a little bit :)")

    // add method `insert` to db
    Meteor.call('addEvent',oneEvent ,()=>{
        // clears input fields onSubmit
      this.setState({
        title: "",
        description: "",
        date: ""
      });
    })
    
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h4>Event Sync</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0em 25%" }}>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Event Date:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter date in the format mm.dd.yyyy"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Event</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEvent;