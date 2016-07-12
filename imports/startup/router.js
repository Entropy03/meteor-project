import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../ui/body.js';

import '../ui/pages/orderPages.js';
import '../ui/pages/ListLayout.js';
import '../ui/pages/addTask.js';
import '../ui/accounts/login.js';

import '../ui/pages/app-not-found.js';

import '../cmd/open/open.js';
import '../cmd/take/take.js';
import '../cmd/check/check.js';
import '../cmd/send/send.js';
import '../cmd/end/end.js';


//FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.route('/', {
    name: 'App.home',
    action() {
           if(Meteor.userId()){
              FlowRouter.go("/home/order");
           }else{
               FlowRouter.go("/login");

           }
    },         

});

FlowRouter.route('/home/:t', {
    name: 'App.home',
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action() {
       BlazeLayout.setRoot('body');

       BlazeLayout.render('Home', {main: 'Lists' });
    },
});
FlowRouter.route('/add', {
    name: 'App.add',
    action() {
       BlazeLayout.setRoot('body');
       BlazeLayout.render('addTask', {top:'sendInfo',main: 'RecInfo',info :'itemsInfo' });

    },
});


FlowRouter.notFound = {
    action() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { main: 'App_notFound' });
    },
};

var cmdRoutes = FlowRouter.group({
    prefix: '/cmd',
    name: 'cmd',
    triggersEnter: [function(context, redirect) {
        console.log('running group triggers');
    }]
});

//开始
cmdRoutes.route('/open/:t/:id', {
    action: function() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { top: 'appPages', main: 'open' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /open trigger');
    }]
});
//发送

cmdRoutes.route('/send/:t/:id', {
    action: function() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { top: 'appPages', main: 'send' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /send trigger');
    }]
});
//检查
cmdRoutes.route('/check/:t/:id', {
    action: function() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { top: 'appPages', main: 'check' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /check trigger');
    }]
});
//获取
cmdRoutes.route('/take/:t/:id', {
    action: function() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { top: 'appPages', main: 'take' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /task trigger');
    }]
});
//结束
cmdRoutes.route('/end/:t/:id', {
    action: function() {
        BlazeLayout.setRoot('body');

        BlazeLayout.render('Home', { top: 'appPages', main: 'end' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /end trigger');
    }]
});

var listRoutes = FlowRouter.group({
    prefix: '/list',
    name: 'list',
    triggersEnter: [function(context, redirect) {
        console.log('running group triggers');
    }]
});

// handling /admin route
listRoutes.route('/', {
    action: function() {
        BlazeLayout.render('ListLayout', { content: 'admin' });
    },
    triggersEnter: [function(context, redirect) {
        console.log('running /admin trigger');
    }]
});

// handling /admin/posts
listRoutes.route('/posts', {
    action: function() {

        BlazeLayout.render('componentLayout', { content: 'posts' });
    }
});
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/login',
  template: 'myLogin',
  layoutTemplate: 'myLayout',
  layoutRegions: {
    nav: 'customNav',
    footer: 'customFooter'
  },
  contentRegion: 'main'
});
