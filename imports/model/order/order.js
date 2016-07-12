import { Template } from 'meteor/templating';
 
import { Meteor } from 'meteor/meteor';

import './order.html';
 
Template.order.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
      //Meteor.call('orders.setChecked', this._id, !this.checked);

  },
  'click .delete'() {
    Meteor.call('orders.remove', this._id);
  },
});