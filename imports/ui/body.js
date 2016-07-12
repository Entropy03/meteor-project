import { Template } from 'meteor/templating';
import { Orders } from '../api/orders.js';
import { ROLE } from '../api/role.js';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import '../model/order/order.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {

   this.autorun(() => {
      this.state = new ReactiveDict();
      Meteor.subscribe('orders');

    });
 


});
Template.Home.helpers({
incompleteCount() {
              var t = FlowRouter.getParam('t');

    return Orders.find({ checked: { $ne: true } ,type: t}).count();
  },
});
Template.Lists.helpers({
  orders() { 
            var t = FlowRouter.getParam('t');

        return Orders.find({ checked: { $ne: true },type: t }, { sort: { createdAt: -1 } });
  }
  
});
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
       Meteor.call('orders.insert', text);

 
    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

});