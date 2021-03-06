import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ListDB } from '../../api/list.js';
import { Orders } from '../../api/orders.js';
import { Meteor } from 'meteor/meteor';

import './open.css';
import './open.html';


Template.open.onCreated(function openPagesOnCreated() {
	
    this.autorun(() => {
    	  Meteor.subscribe('list');
        //无用代码 被默认加载了 body的订阅
        var id = FlowRouter.getParam('id');

	      Meteor.subscribe('orderOne',id);


    });
});
Template.open.onRendered(function openPagesOnRendered() {
  this.autorun(() => {
  	
    var t = FlowRouter.getParam('t');
    var id = FlowRouter.getParam('id');
    var order = Orders.findOne( id );
		 if(order.status !== "open"){
		 	  	FlowRouter.go("/cmd"+"/"+order.status+"/"+t+"/"+id);

		 }
  });
});
Template.openDel.onCreated(function openPagesOnRendered() {
  this.autorun(() => {
    
      // document.write(" <script type='text/javascript' src='//g.alicdn.com/sj/lib/zepto/zepto.min.js' charset='utf-8'></script>");
       //document.write("<script type='text/javascript' src='//g.alicdn.com/msui/sm/0.6.2/js/sm.min.js' charset='utf-8'></script>");

  });
});
Template.open.helpers({

    app_stauts() {
      return getMyList();

    },
      oDetail() {

    var Id = FlowRouter.getParam('id');
    var t  = FlowRouter.getParam('t');
    return  Orders.findOne(Id);

  },
});

Template.openStauts.helpers({
	checkName(name){

	    return name == "open" ? true : false;
	},
});
Template.open.events({
  'click  .open'(event, instance) {
  


  },

});
Template.openDel.events({
    'click .create-actions'(event, instance){
          var buttons1 = [
        {
          text: '请选择',
          label: true
        },
       
        {
          text: '接单',
          color: 'success',

          onClick: function() {
              $('#error').html("接单");
            $('#error').attr("key","success");
            $('#error').attr("class","stus-s");

          }
        },
         {
          text: '失败',
         color: 'danger',
          bold: true,

          onClick: function() {
            $('#error').html("失败");
            $('#error').attr("key","error");
            $('#error').attr("class","stus-e");

          }
        },
         {
          text: '等待',
          onClick: function() {
            $('#error').html("等待");
            $('#error').attr("key","wait");
            $('#error').attr("class","stus-w");

           // $.alert("你选择了“卖出“");
          }
        }
      ];
      var buttons2 = [
        {
          text: '取消',
          bg: 'danger',
           onClick: function() {
            $('#error').html("");
            $('#error').attr("key","");

           // $.alert("你选择了“卖出“");
          }
        }
      ];
      var groups = [buttons1, buttons2];
      $.actions(groups);
    },
    'click .button-success'(event, instance){
     
        //取 订单编号  订单状态  错误码  是否下一步
       if($("#error").attr("key") == "") {
          $.alert("请选择操作");
          return false;
       }
        var t = FlowRouter.getParam('t');
        var id = FlowRouter.getParam('id');
        var describe = {
            "text" :   $('#describe').val(),
            "errStatus" : $("#error").html(),
            "cmd" : "open",
            "username" : Meteor.users.findOne(Meteor.userId()).username
        };
        var order = {}
        var Obj =  Orders.findOne(id);
       if($('#error').attr("key")=="success"){
          var index = 0 ;
          
          var  mylist = getMyList();
          for (var i = mylist.length - 1; i >= 0; i--) {
            if(mylist[i].name =="open"){

                index = ++i <= mylist.length - 1 ? i : --i;

              break;
              }
          };
          order.status = mylist[index].name;
          order.error = "success";
          Obj.describe.push(describe);
          order.describe = Obj.describe;
          order.ownUser  = Meteor.users.findOne(Meteor.userId()).username;
          Meteor.call('orders.setStatus', id,order);
          FlowRouter.go("/cmd"+"/"+order.status+"/"+t+"/"+id);
       }
       if ($('#error').attr("key")=="error") {

            
            order.status = mylist[mylist.length - 1].name; 
            order.error = "error";
            Obj.describe.push(describe);
            order.describe = Obj.describe;
            Meteor.call('orders.setStatus', id,order);
            FlowRouter.go("/cmd"+"/end"+"/"+t+"/"+id);

       };
        if ($('#error').attr("key")=="wait") {
            order.status = "open";
            order.error  = "wait";
            Obj.describe.push(describe);
            order.describe = Obj.describe;
            Meteor.call('orders.setStatus', id,order);

       };
       
    },
    'click .button-danger'(event, instance){
        var t = FlowRouter.getParam('t');
        FlowRouter.go("/home"+"/"+t);


    }
});
function getMyList(){
	var t = FlowRouter.getParam('t');
	var myList = ListDB.findOne({ 'type': t } );

	return myList.cmd;
}
