import { Meteor } from 'meteor/meteor';
import '../imports/api/events.js';
// import Events collection
import { Events } from "/imports/api/events";
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup
});

const eventSchema = new SimpleSchema({
  title:{
    type: String
  },
  description:{
    type: String
  },
  date:{
    type: Date
  },
  isDeleted:{
    type: Boolean,
    optional : true
  }
});

Events.attachSchema(eventSchema);

// Meteor.publish("events", function(){
//   return Events.find();
// });

Meteor.publish("events", function(){
  return Events.find();
});

Meteor.publish("existingEvent", function() {
  return Events.find({isDeleted : true});
});

Meteor.methods({  
  addEvent(event){
    Events.insert({
      title : event.title,
      description : event.description,
      date : event.date,
      isDeleted: false
    });
  }, 
  updateEvent(selectedId,event){
    Events.update({_id: selectedId},{
      $set: {
          title: event.title,
          description: event.description,
          date: event.date,
          isDeleted: false
      }
  })
  },
  deleteEvent(selectedId,event){
    Events.upsert({_id: selectedId},{
      $set: {
          title: event.title,
          description: event.description,
          date: event.date,
          isDeleted: true
      }
  })
  },
  
})

// export const addEvent = new Meteor.ValidatedMethod({

//   name: addEvent,
//   validate: eventSchema.validator(),
//   run({event}){
//     Events.insert({
//       title : event.title,
//       description : event.description,
//       date : event.date
//     });
//   }
// })

