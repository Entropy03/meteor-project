import { Template } from 'meteor/templating';
import { Orders } from '../../api/orders.js';
import { ROLE } from '../../api/role.js';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import './addTask.html';


Template.itemsInfo.onCreated(function openPagesOnCreated() {
	
    this.autorun(() => {
    	 Meteor.subscribe('orders');

    });
});
Template.itemsInfo.events({
  'click #picker'(event) {
   
			  $("#picker").picker({
			  toolbarTemplate: '<header class="bar bar-nav">\
			  	    <button class="button button-link pull-right close-picker">确定</button>\
			     <h1 class="title">选择</h1>\
			     </header>',
			  cols: [
			    {
			      textAlign: 'center',
			      values: ['生活用品', '电子产品', '食品', '服装/箱包/鞋', '医疗用品', '易碎物品', '生鲜', '其他']
			    }
			  ]
			});
  },
  'click  .button-success'(event){

  	var obj = {
  		'text' : $('#itemDeil').val(),
  		'createdAt':new Date(),
  		'status' :'open',
  		'type' : $('#itemType').val(),
  		'kind'	:$('#picker').val(),
  		'itemNum' :$('#itemNum').val(),
  		'sendName' :$('#sendName').val(),
  		'sendPhone' :$('#sendPhone').val(),
  		'sendAddress' :$('#sendAddress').val(),
  		'takePhone' :$('#takePhone').val(),
  		'takeAddress' :$('#takeAddress').val(),
  		'takeName' :$('#takeName').val(),
  		'error' :'',
  		'describe' :[],
  		'ownUser'  :"",
  		'withUser':""


  	};
          Meteor.call('orders.insert', obj);

  },
 'click .button-danger'(event, instance){


            FlowRouter.go("/");


    }

});