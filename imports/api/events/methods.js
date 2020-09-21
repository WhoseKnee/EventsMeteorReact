import { ValidatedMethod } from 'meteor/mdg:validated-method';
import '../../../imports/api/events.js';
// import Events collection
import { Events } from "/imports/api/events";
import SimpleSchema from 'simpl-schema';

const eventSchema = new SimpleSchema({
  title:{
    type: String
  },
  description:{
    type: String
  },
  date:{
    type: String
  },
  isDeleted:{
    type: Boolean
  }
});



export const addEvent = new ValidatedMethod ({
  name: 'addEvent',
  validate: eventSchema.pick(
    'title',
    'description',
    'date',
    'isDeleted'
  ).validator(),
  run(oneEvent){
    Events.insert({
      title : oneEvent.title,
      description : oneEvent.description,
      date : oneEvent.date,
      isDeleted : oneEvent.isDeleted
    });
  }
});