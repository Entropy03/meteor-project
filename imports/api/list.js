import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';



export const ListDB = new Mongo.Collection('list');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('list', function listPublication() {
    return ListDB.find();
  });
}
Meteor.methods({
 
  'list.remove'(Id) {
    check(Id, String);
 
    ListDB.remove(Id);
  },
  'list.setStatus'(Id, status) {
    check(Id, String);
    check(status, String);
    ListDB.update( Id, { $set: { status: status } });

  },
});


