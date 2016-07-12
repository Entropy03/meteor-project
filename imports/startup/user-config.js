import { AccountsTemplates } from 'meteor/useraccounts:core';
import { TAPi18n } from 'meteor/tap:i18n';
if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}
AccountsTemplates.configure({
  showForgotPasswordLink: true,
  texts: {
    errors: {
      loginForbidden: TAPi18n.__('Incorrect username or password'),
      pwdMismatch: TAPi18n.__('Passwords don\'t match'),
    },
    title: {
      signIn:' 登录',
      signUp: '注册',
    },
  },
  defaultTemplate: 'myLogin',
  defaultLayout: 'myLayout',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {},
});

AccountsTemplates.addField({
    _id: 'phone',
    type: 'tel',
    displayName: "手机号",
});
AccountsTemplates.addField({
    _id: "gender",
    type: "select",
    displayName: "性别",
    select: [
        {
            text: "男",
            value: "male",
        },
        {
            text: "女",
            value: "female",
        },
    ],
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    displayName: "用户名",

    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});