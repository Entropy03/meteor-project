import '../imports/startup/router.js';
import '../imports/startup/user-config.js';
getUserLanguage = function () {
  // Put here the logic for determining the user language

  return "zh-CN";
};

if (Meteor.isClient) {
  Meteor.startup(function () {
  		T9n.setLanguage("zh-CN");

  });
}