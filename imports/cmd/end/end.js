import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ListDB } from '../../api/list.js';
import { Orders } from '../../api/orders.js';
import { Meteor } from 'meteor/meteor';

import './end.css';
import './end.html';


Template.end.onCreated(function endPagesOnCreated() {
	
    this.autorun(() => {
  
        Meteor.subscribe('list');

    });
});
Template.end.onRendered(function endPagesOnRendered() {
  this.autorun(() => {
    
       var t = FlowRouter.getParam('t');
       var id = FlowRouter.getParam('id');
     var order = Orders.findOne( id );
     if(order.status !== "end"){
          FlowRouter.go("/cmd"+"/"+order.status+"/"+t+"/"+id);

     }
  });
});
Template.end.helpers({

    app_stauts() {

      return getMyList();

    },
    oDetail() {

      var Id = FlowRouter.getParam('id');
      var t  = FlowRouter.getParam('t');
      return  Orders.findOne(Id);

  },
});

Template.endStauts.helpers({
	checkName(name){
	    return name == "end" ? true : false;
	},
});
Template.end.events({
  'click  .end'(event, instance) {
  	 var index = 0 ;
  	 var t = FlowRouter.getParam('t');
  	 var id = FlowRouter.getParam('id');

  	 var  mylist = getMyList();
  	 for (var i = mylist.length - 1; i >= 0; i--) {
  	 	if(mylist[i].name =="end"){

  	 	  	index = ++i <= mylist.length - 1 ? i : --i;

  	 		break;
  	 	}
  	 };
  	 var order = mylist[index].name;
  	 Meteor.call('orders.setStatus', id,order);
  	 FlowRouter.go("/cmd"+"/"+order+"/"+t+"/"+id);


  },

});
Template.endDel.events({
    'click .create-actions'(event, instance){
          var buttons1 = [
        {
          text: '请选择',
          label: true
        },
       
        {
          text: '完成',
          color: 'success',

          onClick: function() {
              $('#error').html("完成");
            $('#error').attr("key","success");
            $('#error').attr("class","stus-s");

          }
        },
         {
          text: '退货',
         color: 'danger',
          bold: true,

          onClick: function() {
            $('#error').html("退货");
            $('#error').attr("key","error");
            $('#error').attr("class","stus-e");

          }
        },
        
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
            "cmd" : "end",
            "username" : Meteor.users.findOne(Meteor.userId()).username
        };
        var order = {}
        var Obj =  Orders.findOne(id);
        var  mylist = getMyList();

       if($('#error').attr("key")=="success"){
          var index = 0 ;
          
          for (var i = mylist.length - 1; i >= 0; i--) {
            if(mylist[i].name =="end"){

                index = ++i <= mylist.length - 1 ? i : --i;

              break;
              }
          };
          order.status = mylist[index].name;
          order.error = "success";
          Obj.describe.push(describe);
          order.describe = Obj.describe;
          Meteor.call('orders.setStatus', id,order);
          FlowRouter.go("/cmd"+"/"+order+"/"+t+"/"+id);
       }
       if ($('#error').attr("key")=="error") {


            order.status = "end";
            order.error = "error";  
            Obj.describe.push(describe);
            order.describe = Obj.describe;
            Meteor.call('orders.setStatus', id,order);
            FlowRouter.go("/cmd"+"/end"+"/"+t+"/"+id);

       };
        if ($('#error').attr("key")=="wait") {
            order.status = "end";
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