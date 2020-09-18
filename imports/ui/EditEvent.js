import React, { Component } from 'react';
// import Events collection
import { Events } from "../api/events";
import { Modal, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class EditEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            date: ""
        }
        this.isIdCheck = this.isIdCheck.bind(this);
        this.compareId = this.compareId.bind(this);
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
    
        const oneEvent = { titles : this.state.title, 
            description : this.state.description, 
            date : this.state.date
          };
        const selectedId = this.props.id;
        // TODO: Create backend Meteor methods to save created events
        // alert("Will be Saved in a little bit :)")
    
        // add method `update` to db
        Meteor.call('updateEvent',selectedId,oneEvent, () => {
           this.props.onHide(); 
        })
    }

    compareId(oneEvent){
        if(oneEvent._id == this.props.id){
            this.setState({title : oneEvent.title,
                            description : oneEvent.description,
                            date : oneEvent.date})
        }
    }

    isIdCheck() {
        var allEvents = this.props.eventRetrieved;
        console.log(allEvents);
        Object.values(allEvents).forEach(val => this.compareId(val));
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevStates){
        if(prevProps.id !== this.props.id){
            this.isIdCheck();
            console.log("isTitleCheck activated.");
        }
        if(prevStates.events !== this.state.events){
            console.log("events updated.");
        }
    }

    render(){
        return(
            <div>
                <Modal show = {this.props.show} onHide = {this.props.onHide} >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}

// add `withTracker` HOC and pass in `EditEvents` and export the new component
export default withTracker(() => {
    Meteor.subscribe("events");
    const eventsArr = Events.find({}).fetch();
    return {
      eventRetrieved: eventsArr
    }
})(EditEvent);