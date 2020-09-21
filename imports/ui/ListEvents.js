import { Meteor } from 'meteor/meteor';
import React, { Component} from 'react';
// import necessary files
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from "../api/events";
import { Button} from 'react-bootstrap';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
class ListEvents extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            addEditModalShow : false,
            addDeleteModalShow : false,
            selectedButton : ""
        };
        console.log(this.state);
    }

    addEditModalClose =() => {this.setState({addEditModalShow : false})};
    addDeleteModalClose =() => {this.setState({addDeleteModalShow : false})};

    parseData=(event)=>{
        const targetVal = event.target.value;
        const targetName = event.target.name;
        if(targetName == "edit"){
            this.setState({selectedButton : targetVal, addEditModalShow : true});
        }else{
            this.setState({selectedButton : targetVal, addDeleteModalShow : true});
        }
        console.log(this.state.selectedButton);
    };

    render() {
        return (
        <div>
            {this.props.subReady ? 
            this.props.events.length ? this.props.events.map((event) => (
            <div className="list-group" key={event._id} style={{ margin: "20px 100px" }}>
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{event.title}</h5>
                        <small>{event.date.toString()}</small>
                    </div>
                    <p className="mb-1">{event.description}</p>
                    <Button variant="primary" name="edit" value={event._id} onClick={this.parseData} >
                        Edit
                    </Button>
                    <Button variant="d  anger" name="delete" value={event._id} onClick={this.parseData} >
                        Delete
                    </Button>
                </div>
            </div>
            )) : <div className="no-events">OOOPSY: NO EVENTS REGISTERED</div> 
            : 
            <div className="loading"> Loading...</div>}
            
            <EditEvent  
                    show = {this.state.addEditModalShow}
                    onHide = {this.addEditModalClose}
                    id = {this.state.selectedButton}
                    /> 
            <DeleteEvent   
                    show = {this.state.addDeleteModalShow}
                    onHide = {this.addDeleteModalClose}
                    id = {this.state.selectedButton}
                    />
            </div> 
        );
    }
}

// add `withTracker` HOC and pass in `ListEvents` and export the new component
export default withTracker(() => {
    const subEvent = Meteor.subscribe("existingEvent");
    const subReady  = subEvent.ready();
    const eventsArr = Events.find({isDeleted : false}).fetch();
    return{
        subReady: subReady,
        events: eventsArr
        }
  })(ListEvents);