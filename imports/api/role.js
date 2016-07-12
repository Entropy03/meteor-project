import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ROLE = new Mongo.Collection('role');


if (Meteor.isServer) {
  Meteor.publish('role', function tasksPublication() {
    return ROLE.find();
  });
}

Meteor.methods({
  'role.insert'(roleObj) {
    check(roleObj, Object);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    console.log(1);
 
    ROLE.insert({
     	'dataType':roleObj.type,
     	'roleName':roleObj.name,
     	'handle':roleObj.handle,
     	'status' : 5
    });
  },
  'role.remove'(Id) {
    check(Id, String);
 
    ROLE.remove(Id);
  },
  'role.setChecked'(Id, setChecked) {
    check(Id, String);
    check(setChecked, Boolean);
 
    ROLE.update(Id, { $set: { checked: setChecked } });
  },
  
});