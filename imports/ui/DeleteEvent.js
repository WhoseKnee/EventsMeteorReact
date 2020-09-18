import React, { Component } from 'react';
// import Events collection
import { Events } from "../api/events";
// import necessary files
import { withTracker } from 'meteor/react-meteor-data';
import { Modal, Button } from 'react-bootstrap';
class DeleteEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            date: "",
            event_id: ""
        }
        this.isIdCheck = this.isIdCheck.bind(this);
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
    
        const { title, description, date } = this.state;
        const selectedId = this.props.id;
        // TODO: Create backend Meteor methods to save created events
        // alert("Will be Saved in a little bit :)")
    
        Meteor.call('deleteEvent',selectedId, event,() => {
            this.props.onHide(); 
         });
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
                        <Modal.Title>Delete Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this event?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}

// add `withTracker` HOC and pass in `DeleteEvents` and export the new component
export default withTracker(() => {
    Meteor.subscribe("events");
    const eventsArr = Events.find({}).fetch();
    return {
      eventRetrieved: eventsArr
    }
})(DeleteEvent);