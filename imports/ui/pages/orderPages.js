import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Orders } from '../../api/orders.js';

import { LaunchScreen } from 'meteor/launch-screen';
import './orderPages.html';

Template.appHome.onCreated(function orderPagesOnCreated() {
  this.getId = () => FlowRouter.getParam('id');
  this.getType = () => FlowRouter.getParam('t');


  this.autorun(() => {
   	 Meteor.subscribe('orders');

  });
});

Template.appHome.onRendered(function orderPagesOnRendered() {
  this.autorun(() => {

    if (this.subscriptionsReady()) {
       LaunchScreen.hold().release();
    }
  });
});
Template.appPages.helpers({

  oDetail() {

    var Id = FlowRouter.getParam('id');
    var t  = FlowRouter.getParam('t');
    return  Orders.findOne(Id);

  },
});
