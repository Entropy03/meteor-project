import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Orders = new Mongo.Collection('orders');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('orders', function tasksPublication() {
    return Orders.find();
  });
  Meteor.publish('orderOne', function orPublication(id) {
  return Orders.find({'_id': id});
  });
}

Meteor.methods({
  'orders.insert'(obj) {
    check(obj, Object);
 
    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Orders.insert(obj);
  },
  'orders.remove'(taskId) {
    check(taskId, String);
 
    Orders.remove(taskId);
  },
  'orders.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Orders.update(taskId, { $set: { checked: setChecked } });
  },
  'orders.setStatus'(Id, obj) {
    check(Id, String);
    check(obj, Object);
  
    Orders.update( Id, { $set: { status: obj.status,error:obj.error,describe: obj.describe} });

  }
 

});